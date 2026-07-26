import { FREE_TIER_MONTHLY_LIMIT } from './constants';

export interface UserQuotaStatus {
  used: number;
  limit: number;
  hasQuota: boolean;
  remaining: number;
}

/**
 * Calculates current month user usage and remaining allocation.
 */
export function calculateQuota(monthlyAnalysesCount: number, isPro: boolean): UserQuotaStatus {
  if (isPro) {
    return {
      used: monthlyAnalysesCount,
      limit: Infinity,
      hasQuota: true,
      remaining: 9999,
    };
  }

  const remaining = Math.max(0, FREE_TIER_MONTHLY_LIMIT - monthlyAnalysesCount);
  return {
    used: monthlyAnalysesCount,
    limit: FREE_TIER_MONTHLY_LIMIT,
    hasQuota: remaining > 0,
    remaining,
  };
}

/**
 * Computes average score from list of script analyses.
 */
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return Number((sum / scores.length).toFixed(1));
}