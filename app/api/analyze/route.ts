import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { script, category = "General" } = body;

    if (!script || !script.trim()) {
      return NextResponse.json(
        { success: false, error: "Script text is required for analysis." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert YouTube growth strategist and script optimization AI. Analyze the following video script under the category "${category}".
You MUST return ONLY valid JSON matching this exact structure, with no markdown code block formatting or extra text outside the JSON object:
{
  "viralScore": 85,
  "hooks": [
    {
      "style": "Curiosity Gap",
      "text": "Compelling hook text here...",
      "rationale": "Explanation why this hook works..."
    }
  ],
  "titles": [
    {
      "title": "Optimized Title Here",
      "ctrScore": 92,
      "seoScore": 88,
      "readabilityScore": 95
    }
  ],
  "thumbnailConcepts": {
    "textIdeas": ["Idea 1", "Idea 2"],
    "concept": "Detailed visual description of thumbnail...",
    "colorPalette": ["#ff0000", "#000000"],
    "emotionalFocus": "Curiosity & Urgency"
  },
  "retentionAnalysis": {
    "slowIntros": ["Point 1 about slow intros..."],
    "weakTransitions": ["Point 1 about weak transitions..."],
    "patternInterrupts": ["Point 1 about pattern interrupts..."]
  },
  "seoDescription": {
    "fullText": "Full optimized YouTube description...",
    "keywords": ["keyword1", "keyword2"],
    "hashtags": ["hashtag1", "hashtag2"]
  }
}

Script to analyze:
"""
${script}
"""
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const responseText = response.choices[0]?.message?.content || "{}";

    console.log("========== RAW AI RESPONSE ==========");
    console.log(responseText);
    console.log("====================================");

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseError) {
      // Robust fallback cleanup if markdown code blocks were included
      const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("API Analyze Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate AI analysis" },
      { status: 500 }
    );
  }
}