
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  try {
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

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

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

    let parsed;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch {
      console.error("Invalid JSON returned by Groq:", cleanedResponse);
      throw new Error("The AI returned invalid JSON.");
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error: unknown) {
    console.error("Groq Error:", error);

    const message =
      error instanceof Error ? error.message : "Analysis failed.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

