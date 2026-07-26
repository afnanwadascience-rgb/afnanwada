export type SubscriptionPlanTier = 'FREE' | 'PRO';

export interface UserQuotaStatus {
  used: number;
  limit: number;
  hasQuota: boolean;
  remaining: number;
}

export interface SubscriptionAnalytics {
  totalAnalyses: number;
  avgViralScore: number;
  monthlyQuotaUsed: number;
  monthlyQuotaLimit: number;
  topHooksUsed: string[];
  scoreTrend?: Array<{
    date: string;
    score: number;
  }>;
}

export interface AdminUpdateSubscriptionPayload {
  userId: string;
  newPlan: SubscriptionPlanTier;
}