import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisRequest {
  script: string;
  category: string;
  targetDurationSeconds?: number;
}

export interface AnalysisResponse {
  overallScore: number;
  hooks: Array<{
    style: string;
    text: string;
    rationale: string;
  }>;
  titles: Array<{
    title: string;
    ctrScore: number;
  }>;
  retentionAlerts: Array<{
    timestamp: string;
    issue: string;
    suggestion: string;
  }>;
  seoDescription: string;
}


export async function analyzeScriptWithAI(
  data: AnalysisRequest
): Promise<AnalysisResponse> {

  console.log("REAL GEMINI FUNCTION CALLED");
  console.log("SCRIPT:", data.script.substring(0, 100));


  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }


  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.8,
      responseMimeType: "application/json",
    },
  });


  const prompt = `
You are an expert YouTube script analyst.

Analyze this exact script.

Category:
${data.category}

Target duration:
${data.targetDurationSeconds || "unknown"} seconds

Script:
"""
${data.script}
"""

Return ONLY valid JSON.

Rules:
- Titles must be based on this exact script.
- Hooks must match the actual topic.
- Do not use generic examples.
- Find real retention problems.
- Make SEO description related to the script.


JSON format:

{
  "overallScore": number,

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
      "ctrScore": number
    }
  ],

  "retentionAlerts": [
    {
      "timestamp": "string",
      "issue": "string",
      "suggestion": "string"
    }
  ],

  "seoDescription": "string"
}
`;


  const result = await model.generateContent(prompt);


  let responseText = result.response.text();


  // Remove markdown if Gemini adds it
  responseText = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();


  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini returned invalid JSON:", responseText);
    throw new Error("Gemini response was not valid JSON");
  }
}