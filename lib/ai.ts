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

/**
 * Sends script payload to AI Provider (e.g. OpenAI GPT-4o or Anthropic Claude)
 * and formats the JSON output into structured platform metrics.
 */
export async function analyzeScriptWithAI(data: AnalysisRequest): Promise<AnalysisResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Fallback Mock Engine for testing environments without API Key
    return {
      overallScore: 91,
      hooks: [
        { style: 'Curiosity', text: 'Most creators make this $5,000 mistake before clicking record...', rationale: 'High loss aversion.' },
        { style: 'Story', text: 'Three months ago my channel was dead. Here is what changed everything.', rationale: 'Narrative transformation.' },
      ],
      titles: [
        { title: 'I Fixed My YouTube Script Mechanics (And Doubled Retention)', ctrScore: 94 },
        { title: 'Why 99% of YouTube Scripts Fail in 30 Seconds', ctrScore: 91 },
      ],
      retentionAlerts: [
        { timestamp: '0:25 - 0:45', issue: 'Context drags before presenting the problem.', suggestion: 'Cut lines 12–16 or add dynamic B-roll.' }
      ],
      seoDescription: 'Optimized YouTube video description with timestamps and target keywords.'
    };
  }

  // Production API Fetch implementation
  const prompt = `Analyze this YouTube script for category "${data.category}":\n\n${data.script}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  });

  const raw = await response.json();
  return JSON.parse(raw.choices[0].message.content);
}