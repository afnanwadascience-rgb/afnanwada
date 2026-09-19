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
    // 2. Check user's plan
    // --------------------------------------------------
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    // 3. Check FREE user's total analysis limit
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
          },
          { status: 403 }
        );
      }
    }

    // --------------------------------------------------
    // 4. Read request
    // --------------------------------------------------
    const { script, category = "General" } = await request.json();

    if (!script?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Script text is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Check Groq API key
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
    // 6. Build AI prompt
    // --------------------------------------------------
    const prompt = `
You are an elite YouTube strategist.

Analyze the following YouTube script.

Category:
${category}

Return ONLY valid JSON using exactly this structure:

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
- viralScore must be an integer from 0 to 100.
- ctrScore must be an integer from 0 to 100.
- seoScore must be an integer from 0 to 100.
- readabilityScore must be an integer from 0 to 100.
- hooks must contain useful, specific alternatives based on the script.
- titles must be relevant to the actual script.
- retentionAnalysis must identify specific weaknesses rather than generic advice.
- Do not use markdown.
- Do not include explanations outside the JSON object.
- Return valid JSON only.

SCRIPT:

${script}
`;

    // --------------------------------------------------
    // 7. Run AI analysis
    // --------------------------------------------------
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0.6,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are a YouTube script analysis engine. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("Groq returned an empty response.");
    }

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch {
      console.error("Invalid JSON returned by Groq:", cleanedResponse);
      throw new Error("The AI returned invalid JSON.");
    }

    // --------------------------------------------------
    // 8. Save successful analysis
    // --------------------------------------------------
    const savedAnalysis = await prisma.analysis.create({
      data: {
        userId,
        title:
          parsed.titles?.[0]?.title ||
          "Untitled Script Analysis",

        category,

        scriptContent: script,

        viralScore:
          typeof parsed.viralScore === "number"
            ? parsed.viralScore
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
    // 9. Calculate remaining FREE analyses
    // --------------------------------------------------
    let remaining: number | null = null;

    if (!isPro) {
      const used = await prisma.analysis.count({
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
    // 10. Return result
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
        used: isPro ? null : FREE_ANALYSIS_LIMIT - (remaining ?? 0),
        limit: isPro ? null : FREE_ANALYSIS_LIMIT,
        remaining,
      },
    });
  } catch (error: unknown) {
    console.error("Groq/Analysis Error:", error);

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