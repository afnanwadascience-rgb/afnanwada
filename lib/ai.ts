export interface AnalysisRequest {
  script: string;
  category: string;
  targetDurationSeconds?: number;
}

export interface AnalysisResponse {
  overallScore: number;
  hooks: Array<{ style: string; text: string; rationale: string }>;
  titles: Array<{ title: string; ctrScore: number }>;
  retentionAlerts: Array<{ timestamp: string; issue: string; suggestion: string }>;
  seoDescription: string;
}

export async function analyzeScriptWithAI(
  data: AnalysisRequest
): Promise<AnalysisResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const prompt = `
You are an expert YouTube script analyst.

Analyze the following script carefully.

Category:
${data.category}

Script:
${data.script}

Return ONLY valid JSON.

Requirements:
- Create titles specifically based on this script.
- Create hooks that match the actual topic.
- Do not reuse generic examples.
- Analyze retention problems from this exact script.
- Make SEO description related to this script.

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

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content:
              "You analyze YouTube scripts and generate unique creator-focused insights.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: {
          type: "json_object",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Error: ${errorText}`);
  }

  const result = await response.json();

  return JSON.parse(result.choices[0].message.content);
}