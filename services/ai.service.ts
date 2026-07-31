import { AnalysisRequest, AnalysisResponse } from '@/lib/ai';

export class AIService {
  /**
   * Calls the real AI analyzer API route.
   */
  static async analyzeScript(
    payload: AnalysisRequest
  ): Promise<AnalysisResponse> {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "AI analysis failed"
        );
      }

      return result.data;

    } catch (error) {
      console.error(
        "[AIService.analyzeScript] Error calling AI:",
        error
      );

      throw new Error(
        "Failed to generate script evaluation from AI model."
      );
    }
  }

  /**
   * Generates additional hook variations.
   */
  static async generateHooksOnly(
    script: string,
    styleCount: number = 6
  ) {
    const response = await this.analyzeScript({
      script,
      category: "Hook Generation",
    });

    return response.hooks.slice(0, styleCount);
  }
}