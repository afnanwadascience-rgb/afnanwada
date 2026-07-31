import OpenAI from "openai";

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

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function analyzeScriptWithAI(
  data: AnalysisRequest
): Promise<AnalysisResponse> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  if (!data.script.trim()) {
    throw new Error("Script is required.");
  }

  const prompt = `
You are an elite YouTube strategist.

Analyze ONLY the following script.

Category:
${data.category}

Target Duration:
${data.targetDurationSeconds ?? "Unknown"} seconds

SCRIPT:
"""
${data.script}
"""

Return ONLY valid JSON.

{
  "overallScore": 0,
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
      "ctrScore":0
    }
  ],
  "retentionAlerts":[
    {
      "timestamp":"",
      "issue":"",
      "suggestion":""
    }
  ],
  "seoDescription":""
}
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
          "Return only valid JSON. Never use markdown or explanations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  try {
    return JSON.parse(content) as AnalysisResponse;
  } catch {
    console.error("Invalid JSON:", content);
    throw new Error("Groq returned invalid JSON.");
  }
}