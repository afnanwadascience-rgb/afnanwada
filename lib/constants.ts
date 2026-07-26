export const APP_NAME = 'CreatorPilot AI';
export const FREE_TIER_MONTHLY_LIMIT = 3;

export const SCRIPT_CATEGORIES = [
  'Educational / How-To',
  'YouTube Shorts (0-60s)',
  'Gaming & Entertainment',
  'Business & Finance',
  'Tech Review',
  'Vlog & Storytelling',
] as const;

export const HOOK_STYLES = [
  'Curiosity',
  'Story',
  'Shock',
  'Question',
  'Authority',
  'Emotional',
] as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 88,
  GOOD: 75,
  NEEDS_IMPROVEMENT: 60,
};