import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const FREE_ANALYSIS_LIMIT = 10;

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  try {
    // ---------------------------------------------
    // 1. Authentication
    // ---------------------------------------------
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to analyze a script.",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // ---------------------------------------------
    // 2. Read request
    // ---------------------------------------------
    const body = await request.json();

    const script =
      typeof body?.script === "string"
        ? body.script
        : "";

    const category =
      typeof body?.category === "string"
        ? body.category
        : "General";

    if (!script.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Script text is required.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 3. Check API key
    // ---------------------------------------------
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 4. Get user plan
    // ---------------------------------------------
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        plan: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User account not found.",
        },
        { status: 404 }
      );
    }

    const isPro = user.plan === "PRO";

    // ---------------------------------------------
    // 5. Free plan limit
    // ---------------------------------------------
    if (!isPro) {
      const analysisCount =
        await prisma.analysis.count({
          where: {
            userId,
          },
        });

      if (analysisCount >= FREE_ANALYSIS_LIMIT) {
        return NextResponse.json(
          {
            success: false,
            error:
              "You have used all 10 free analyses. Upgrade to Pro to continue.",
            code: "FREE_ANALYSIS_LIMIT_REACHED",
            used: analysisCount,
            limit: FREE_ANALYSIS_LIMIT,
            remaining: 0,
          },
          { status: 403 }
        );
      }
    }

    // ---------------------------------------------
    // 6. AI prompt
    // ---------------------------------------------
    const prompt = `
Analyze the following YouTube script as an expert YouTube strategist.

Category:
${category}

You MUST return a valid JSON object.

Return ONLY JSON.
Do not use markdown.
Do not use code fences.
Do not write explanations outside the JSON.

Use exactly this structure:

{
  "viralScore": 0,
  "hooks": [
    {
      "style": "",
      "text": "",
      "rationale": ""
    }
  ],
  "titles": [
    {
      "title": "",
      "ctrScore": 0,
      "seoScore": 0,
      "readabilityScore": 0
    }
  ],
  "thumbnailConcepts": {
    "textIdeas": [],
    "concept": "",
    "colorPalette": [],
    "emotionalFocus": ""
  },
  "retentionAnalysis": {
    "slowIntros": [],
    "weakTransitions": [],
    "patternInterrupts": []
  },
  "seoDescription": {
    "fullText": "",
    "keywords": [],
    "hashtags": []
  }
}

Rules:

- viralScore must be an integer between 0 and 100.
- ctrScore must be an integer between 0 and 100.
- seoScore must be an integer between 0 and 100.
- readabilityScore must be an integer between 0 and 100.
- Generate specific hooks based on the script.
- Generate relevant YouTube titles.
- Analyze the actual script rather than giving generic advice.
- Give useful thumbnail concepts.
- Identify weak introductions.
- Identify weak transitions.
- Suggest pattern interrupts.
- Generate a useful SEO description.
- Keep keywords and hashtags relevant to the script.
- All arrays must remain valid JSON arrays.
- All strings must use valid JSON quotation marks.
- Do not include trailing commas.

SCRIPT:

${script}
`;

    // ---------------------------------------------
    // 7. Call Groq
    // ---------------------------------------------
    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-oss-20b",

        temperature: 0.3,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content:
              "You are a YouTube script analysis engine. You must return valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    // ---------------------------------------------
    // 8. Get AI response
    // ---------------------------------------------
    const response =
      completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    // ---------------------------------------------
    // 9. Parse JSON
    // ---------------------------------------------
    let parsed: any;

    try {
      parsed = JSON.parse(response);
    } catch {
      console.error(
        "Invalid JSON returned by Groq:",
        response
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "The AI returned invalid JSON. Please try again.",
          code: "INVALID_AI_JSON",
        },
        { status: 502 }
      );
    }

    // ---------------------------------------------
    // 10. Validate/fix response structure
    // ---------------------------------------------
    if (
      typeof parsed !== "object" ||
      parsed === null
    ) {
      throw new Error(
        "AI returned an invalid analysis object."
      );
    }

    if (
      typeof parsed.viralScore !== "number"
    ) {
      parsed.viralScore = 0;
    }

    if (!Array.isArray(parsed.hooks)) {
      parsed.hooks = [];
    }

    if (!Array.isArray(parsed.titles)) {
      parsed.titles = [];
    }

    if (
      !parsed.thumbnailConcepts ||
      typeof parsed.thumbnailConcepts !==
        "object"
    ) {
      parsed.thumbnailConcepts = {};
    }

    if (
      !Array.isArray(
        parsed.thumbnailConcepts.textIdeas
      )
    ) {
      parsed.thumbnailConcepts.textIdeas = [];
    }

    if (
      !Array.isArray(
        parsed.thumbnailConcepts.colorPalette
      )
    ) {
      parsed.thumbnailConcepts.colorPalette = [];
    }

    if (
      typeof parsed.thumbnailConcepts.concept !==
      "string"
    ) {
      parsed.thumbnailConcepts.concept = "";
    }

    if (
      typeof parsed.thumbnailConcepts.emotionalFocus !==
      "string"
    ) {
      parsed.thumbnailConcepts.emotionalFocus = "";
    }

    if (
      !parsed.retentionAnalysis ||
      typeof parsed.retentionAnalysis !==
        "object"
    ) {
      parsed.retentionAnalysis = {};
    }

    if (
      !Array.isArray(
        parsed.retentionAnalysis.slowIntros
      )
    ) {
      parsed.retentionAnalysis.slowIntros = [];
    }

    if (
      !Array.isArray(
        parsed.retentionAnalysis.weakTransitions
      )
    ) {
      parsed.retentionAnalysis.weakTransitions = [];
    }

    if (
      !Array.isArray(
        parsed.retentionAnalysis.patternInterrupts
      )
    ) {
      parsed.retentionAnalysis.patternInterrupts = [];
    }

    if (
      !parsed.seoDescription ||
      typeof parsed.seoDescription !== "object"
    ) {
      parsed.seoDescription = {};
    }

    if (
      typeof parsed.seoDescription.fullText !==
      "string"
    ) {
      parsed.seoDescription.fullText = "";
    }

    if (
      !Array.isArray(
        parsed.seoDescription.keywords
      )
    ) {
      parsed.seoDescription.keywords = [];
    }

    if (
      !Array.isArray(
        parsed.seoDescription.hashtags
      )
    ) {
      parsed.seoDescription.hashtags = [];
    }

    // ---------------------------------------------
    // 11. Save analysis
    // ---------------------------------------------
    const savedAnalysis =
      await prisma.analysis.create({
        data: {
          userId,

          title:
            parsed.titles?.[0]?.title ||
            "Untitled Script Analysis",

          category,

          scriptContent: script,

          viralScore: Math.max(
            0,
            Math.min(
              100,
              Math.round(
                Number(parsed.viralScore) || 0
              )
            )
          ),

          hooks: JSON.stringify(
            parsed.hooks
          ),

          titles: JSON.stringify(
            parsed.titles
          ),

          retentionAlerts:
            JSON.stringify(
              parsed.retentionAnalysis
            ),

          seoDescription:
            parsed.seoDescription.fullText,
        },
      });

    // ---------------------------------------------
    // 12. Calculate quota
    // ---------------------------------------------
    let used: number | null = null;
    let remaining: number | null = null;

    if (!isPro) {
      used =
        await prisma.analysis.count({
          where: {
            userId,
          },
        });

      remaining = Math.max(
        FREE_ANALYSIS_LIMIT - used,
        0
      );
    }

    // ---------------------------------------------
    // 13. Return result
    // ---------------------------------------------
    return NextResponse.json({
      success: true,

      data: parsed,

      analysis: {
        id: savedAnalysis.id,
        createdAt: savedAnalysis.createdAt,
      },

      quota: {
        plan: user.plan,
        used,
        limit: isPro
          ? null
          : FREE_ANALYSIS_LIMIT,
        remaining,
      },
    });
  } catch (error: unknown) {
    console.error(
      "Groq/Analysis Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Analysis failed.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}