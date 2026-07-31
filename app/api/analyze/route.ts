import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { script, category = "Educational" } = body;

    if (!script || typeof script !== "string" || script.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            "Script content is required and must be at least 20 characters long.",
        },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: `
You are an expert YouTube Script Analyzer.

Analyze ONLY the script below.

Category: ${category}

Script:
${script}

Return ONLY valid JSON in this format:

{
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

Detect the language automatically.
If the script is Bengali, answer in Bengali.
If English, answer in English.
Do not include markdown.
Do not include explanations.
Return JSON only.
`,
    });

    const text = response.output_text;

    const analysisResult = JSON.parse(text);

    return NextResponse.json(
      {
        success: true,
        data: analysisResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to process script analysis.",
      },
      { status: 500 }
    );
  }
}