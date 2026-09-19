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
    // --------------------------------------------------
    // 1. Check authentication
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 2. Read request
    // --------------------------------------------------
    const body = await request.json();

    const script =
      typeof body?.script === "string" ? body.script : "";

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

    // --------------------------------------------------
    // 3. Check Groq API key
    // --------------------------------------------------
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 4. Find user and plan
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 5. Check FREE analysis limit
    // --------------------------------------------------
    if (!isPro) {
      const analysisCount = await prisma.analysis.count({
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

    // --------------------------------------------------
    // 6. Build AI prompt
    // --------------------------------------------------
    const prompt = `
You are an expert YouTube script strategist.

Analyze the YouTube script below.

Category:
${category}

Return ONLY ONE valid JSON object.

Do not use:
- Markdown
- Code fences
- Comments
- Explanations outside JSON
- Trailing commas

The JSON must follow EXACTLY this structure:

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

1. viralScore must be an integer from 0 to 100.

2. hooks must contain useful and specific alternative hooks based on the actual script.

3. Each hook must contain:
   - style
   - text
   - rationale

4. titles must be relevant to the actual script.

5. Each title must contain:
   - title
   - ctrScore
   - seoScore
   - readabilityScore

6. All scores must be integers from 0 to 100.

7. thumbnailConcepts must contain:
   - textIdeas as an array of short thumbnail text ideas
   - concept as a description
   - colorPalette as an array
   - emotionalFocus as a short description

8. retentionAnalysis must contain:
   - slowIntros as an array
   - weakTransitions as an array
   - patternInterrupts as an array

9. seoDescription must contain:
   - fullText
   - keywords as an array
   - hashtags as an array

10. Base everything on the actual script.

11. Do not invent unrelated topics.

12. Return valid JSON only.

SCRIPT:

${script}
`;

    // --------------------------------------------------
    // 7. Call Groq
    // --------------------------------------------------
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a YouTube script analysis engine. Return exactly one valid JSON object and nothing else.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response =
      completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error(
        "Groq returned an empty response."
      );
    }

    // --------------------------------------------------
    // 8. Clean AI response
    // --------------------------------------------------
    const cleanedResponse = response
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // --------------------------------------------------
    // 9. Parse JSON
    // --------------------------------------------------
    let parsed: any;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (jsonError) {
      console.error(
        "Groq returned invalid JSON:"
      );

      console.error(cleanedResponse);

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

    // --------------------------------------------------
    // 10. Basic response validation
    // --------------------------------------------------
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
      typeof parsed.thumbnailConcepts !== "object"
    ) {
      parsed.thumbnailConcepts = {
        textIdeas: [],
        concept: "",
        colorPalette: [],
        emotionalFocus: "",
      };
    }

    if (
      !parsed.retentionAnalysis ||
      typeof parsed.retentionAnalysis !== "object"
    ) {
      parsed.retentionAnalysis = {
        slowIntros: [],
        weakTransitions: [],
        patternInterrupts: [],
      };
    }

    if (
      !parsed.seoDescription ||
      typeof parsed.seoDescription !== "object"
    ) {
      parsed.seoDescription = {
        fullText: "",
        keywords: [],
        hashtags: [],
      };
    }

    // --------------------------------------------------
    // 11. Save successful analysis
    // --------------------------------------------------
    const savedAnalysis =
      await prisma.analysis.create({
        data: {
          userId,

          title:
            parsed.titles?.[0]?.title ||
            "Untitled Script Analysis",

          category,

          scriptContent: script,

          viralScore:
            typeof parsed.viralScore === "number"
              ? Math.max(
                  0,
                  Math.min(
                    100,
                    Math.round(parsed.viralScore)
                  )
                )
              : 0,

          hooks: JSON.stringify(
            parsed.hooks || []
          ),

          titles: JSON.stringify(
            parsed.titles || []
          ),

          retentionAlerts: JSON.stringify(
            parsed.retentionAnalysis || {}
          ),

          seoDescription:
            parsed.seoDescription?.fullText ||
            "",
        },
      });

    // --------------------------------------------------
    // 12. Calculate remaining quota
    // --------------------------------------------------
    let used: number | null = null;
    let remaining: number | null = null;

    if (!isPro) {
      used = await prisma.analysis.count({
        where: {
          userId,
        },
      });

      remaining = Math.max(
        FREE_ANALYSIS_LIMIT - used,
        0
      );
    }

    // --------------------------------------------------
    // 13. Return successful result
    // --------------------------------------------------
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