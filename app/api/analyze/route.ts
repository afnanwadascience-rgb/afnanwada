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

    const prompt = `
You are an elite YouTube strategist.

Analyze the following YouTube script.

Category:
${category}

Return ONLY valid JSON.

{
  "viralScore": 0,
  "hooks":[
    {
      "style":"",
      "text":"",
      "rationale":""
    }
  ],
  "titles":[
    {
      "title":"",
      "ctrScore":0,
      "seoScore":0,
      "readabilityScore":0
    }
  ],
  "thumbnailConcepts":{
    "textIdeas":[],
    "concept":"",
    "colorPalette":[],
    "emotionalFocus":""
  },
  "retentionAnalysis":{
    "slowIntros":[],
    "weakTransitions":[],
    "patternInterrupts":[]
  },
  "seoDescription":{
    "fullText":"",
    "keywords":[],
    "hashtags":[]
  }
}

SCRIPT:

${script}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. Never use markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let response =
      completion.choices[0]?.message?.content ?? "";

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(response);

    return NextResponse.json({
      success: true,
      data: parsed,
    });

  } catch (error: any) {
    console.error("Groq Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Analysis failed.",
      },
      { status: 500 }
    );
  }
}