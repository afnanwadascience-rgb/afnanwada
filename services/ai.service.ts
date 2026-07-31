import { AnalysisRequest, AnalysisResponse } from '@/lib/ai';

export class AIService {
  /**
   * Calls the real OpenAI API through Next.js API route.
   */
  static async analyzeScript(payload: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[AIService.analyzeScript] Error:', error);
      throw new Error('Failed to generate script evaluation from AI model.');
    }
  }

  /**
   * Generate hook variations.
   */
  static async generateHooksOnly(script: string, styleCount: number = 6) {
    const response = await this.analyzeScript({
      script,
      category: 'Hook Generation',
    });

    return response.hooks.slice(0, styleCount);
  }
}