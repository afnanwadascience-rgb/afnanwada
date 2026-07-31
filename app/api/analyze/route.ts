import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini API key is missing.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { script, category = "General" } = body;

    if (!script || !script.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Script text is required for analysis.",
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });


    const prompt = `
You are an expert YouTube growth strategist and script optimization AI.

Analyze this YouTube script under the category: "${category}"

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Required JSON format:

{
  "viralScore": number,

  "hooks": [
    {
      "style": "string",
      "text": "string",
      "rationale": "string"
    }
  ],

  "titles": [
    {
      "title": "string",
      "ctrScore": number,
      "seoScore": number,
      "readabilityScore": number
    }
  ],

  "thumbnailConcepts": {
    "textIdeas": [],
    "concept": "string",
    "colorPalette": [],
    "emotionalFocus": "string"
  },

  "retentionAnalysis": {
    "slowIntros": [],
    "weakTransitions": [],
    "patternInterrupts": []
  },

  "seoDescription": {
    "fullText": "string",
    "keywords": [],
    "hashtags": []
  }
}


SCRIPT:

"""
${script}
"""
`;

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    console.log("========== GEMINI RESPONSE ==========");
    console.log(responseText);
    console.log("====================================");


    // Clean possible markdown formatting
    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    let parsedData;

    try {
      parsedData = JSON.parse(responseText);
    } catch (error) {

      console.error(
        "JSON Parse Failed:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,
          error: "AI returned invalid JSON format.",
        },
        { status: 500 }
      );
    }


    return NextResponse.json({
      success: true,
      data: parsedData,
    });


  } catch (error: any) {

    console.error("Gemini Analyze Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to generate AI analysis",
      },
      { status: 500 }
    );
  }
}