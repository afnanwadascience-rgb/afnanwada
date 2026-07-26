'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UsageAnalytics {
  totalAnalyses: number;
  avgViralScore: number;
  monthlyQuotaUsed: number;
  monthlyQuotaLimit: number;
  topHooksUsed: string[];
}

export function useSubscription() {
  const [analytics, setAnalytics] = useState<UsageAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to fetch analytics.');

      setAnalytics(data.analytics);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching subscription data.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const hasQuotaRemaining = analytics
    ? analytics.monthlyQuotaUsed < analytics.monthlyQuotaLimit
    : true;

  const remainingQuota = analytics
    ? Math.max(0, analytics.monthlyQuotaLimit - analytics.monthlyQuotaUsed)
    : 0;

  return {
    analytics,
    loading,
    error,
    hasQuotaRemaining,
    remainingQuota,
    refreshSubscription: fetchAnalytics,
  };
}