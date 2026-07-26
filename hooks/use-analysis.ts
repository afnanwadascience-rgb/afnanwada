'use client';

import { useState } from 'react';

export interface AnalysisData {
  id: string;
  createdAt: string;
  category: string;
  viralScore: {
    overall: number;
    hookScore: number;
    retentionScore: number;
    seoScore: number;
    emotionalScore: number;
    recommendation: string;
  };
  hooks: Array<{ style: string; text: string; rationale: string }>;
  titles: Array<{ title: string; ctrScore: number; seoScore: number; readabilityScore: number }>;
  thumbnailConcepts: {
    textIdeas: string[];
    concept: string;
    colorPalette: string[];
    emotionalFocus: string;
  };
  retentionAnalysis: {
    slowIntros: Array<{ timestamp: string; section: string; issue: string; suggestion: string }>;
    weakTransitions: Array<{ line: number; issue: string; suggestion: string }>;
    patternInterrupts: string[];
  };
  seoDescription: {
    fullText: string;
    keywords: string[];
    hashtags: string[];
  };
}

export function useAnalysis() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  /**
   * Triggers the AI script evaluation endpoint.
   */
  const analyzeScript = async (script: string, category: string = 'Educational') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, category }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to analyze script.');
      }

      setAnalysis(resData.data);
      return resData.data as AnalysisData;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Downloads analysis data as a file.
   */
  const exportReport = async (analysisId: string, format: 'markdown' | 'json' = 'markdown') => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId, format }),
      });

      if (!response.ok) throw new Error('Export failed.');

      if (format === 'markdown') {
        const text = await response.text();
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `script-analysis-${analysisId}.md`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to download report:', err);
    }
  };

  return {
    loading,
    error,
    analysis,
    analyzeScript,
    exportReport,
    resetAnalysis: () => setAnalysis(null),
  };
}