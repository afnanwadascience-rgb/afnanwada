import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { script, category = "Educational" } = body;
    console.log("Received script:");
    console.log(script);

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

Return ONLY valid JSON.

Requirements:
- Generate exactly 6 unique hooks.
- Generate exactly 3 unique titles.
- Base every result ONLY on the provided script.
- Never reuse generic hooks.
- Detect the script language automatically.
- If the script is Bengali, return everything in Bengali.
- If the script is English, return everything in English.

Return this JSON schema:

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
console.log("AI response:");
console.log(response.output_text);
const text = response.output_text;

if (!text) {
  return NextResponse.json(
    { error: "The AI returned an empty response." },
    { status: 500 }
  );
}

console.log("Raw AI response:");
console.log(text);

let analysisResult;

try {
  analysisResult = JSON.parse(text);
} catch (e) {
  console.error("Failed to parse AI response:", text);

  return NextResponse.json(
    {
      error: "The AI returned an invalid JSON response.",
      raw: text,
    },
    { status: 500 }
  );
}

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