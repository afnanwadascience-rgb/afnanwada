export type ScriptCategory =
  | 'Educational / How-To'
  | 'YouTube Shorts (0-60s)'
  | 'Gaming & Entertainment'
  | 'Business & Finance'
  | 'Tech Review'
  | 'Vlog & Storytelling';

export type HookStyle =
  | 'Curiosity'
  | 'Story'
  | 'Shock'
  | 'Question'
  | 'Authority'
  | 'Emotional';

export interface HookVariation {
  style: HookStyle;
  text: string;
  rationale: string;
}

export interface TitleSuggestion {
  title: string;
  ctrScore: number;
  seoScore: number;
  readabilityScore: number;
}

export interface ThumbnailConcept {
  textIdeas: string[];
  concept: string;
  colorPalette: string[];
  emotionalFocus: string;
}

export interface RetentionSlowIntro {
  timestamp: string;
  section: string;
  issue: string;
  suggestion: string;
}

export interface RetentionWeakTransition {
  line: number;
  issue: string;
  suggestion: string;
}

export interface RetentionAnalysis {
  slowIntros: RetentionSlowIntro[];
  weakTransitions: RetentionWeakTransition[];
  patternInterrupts: string[];
}

export interface SeoDescription {
  fullText: string;
  keywords: string[];
  hashtags: string[];
}

export interface ViralScoreBreakdown {
  overall: number;
  hookScore: number;
  retentionScore: number;
  seoScore: number;
  emotionalScore: number;
  recommendation: string;
}

export interface AnalysisData {
  id: string;
  createdAt: string;
  category: ScriptCategory | string;
  viralScore: ViralScoreBreakdown;
  hooks: HookVariation[];
  titles: TitleSuggestion[];
  thumbnailConcepts: ThumbnailConcept;
  retentionAnalysis: RetentionAnalysis;
  seoDescription: SeoDescription;
}

export interface ScriptAnalysisRecord {
  id: string;
  userId: string;
  title: string;
  category: string;
  scriptContent: string;
  viralScore: number;
  hooks: string; // JSON string
  titles: string; // JSON string
  retentionAlerts: string; // JSON string
  seoDescription: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}