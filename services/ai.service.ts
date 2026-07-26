import { analyzeScriptWithAI, AnalysisRequest, AnalysisResponse } from '@/lib/ai';

export class AIService {
  /**
   * Invokes the primary AI model to analyze script retention, hooks, titles, and SEO.
   */
  static async analyzeScript(payload: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      return await analyzeScriptWithAI(payload);
    } catch (error) {
      console.error('[AIService.analyzeScript] Error calling AI engine:', error);
      throw new Error('Failed to generate script evaluation from AI model.');
    }
  }

  /**
   * Dedicated prompt runner for generating additional hook variations.
   */
  static async generateHooksOnly(script: string, styleCount: number = 6) {
    const promptPayload: AnalysisRequest = {
      script,
      category: 'Hook Generation',
    };
    const response = await this.analyzeScript(promptPayload);
    return response.hooks.slice(0, styleCount);
  }
}