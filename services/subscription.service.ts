import { prisma } from '@/lib/prisma';

const FREE_ANALYSIS_LIMIT = 10;

export class SubscriptionService {
  /**
   * Calculates the user's current analysis quota.
   *
   * FREE users get 10 analyses total.
   * PRO users have unlimited analyses.
   */
  static async getUserQuotaStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    if (!user) {
      return {
        hasQuota: false,
        used: 0,
        limit: 0,
        remaining: 0,
        isPro: false,
      };
    }

    const isPro = user.plan === 'PRO';

    // PRO users have unlimited analyses.
    if (isPro) {
      return {
        hasQuota: true,
        used: 0,
        limit: null,
        remaining: null,
        isPro: true,
      };
    }

    // Count ALL analyses for the user.
    // There is no monthly reset and no 1-hour cooldown.
    const analysisCount = await prisma.analysis.count({
      where: {
        userId,
      },
    });

    const remaining = Math.max(FREE_ANALYSIS_LIMIT - analysisCount, 0);

    return {
      hasQuota: analysisCount < FREE_ANALYSIS_LIMIT,
      used: analysisCount,
      limit: FREE_ANALYSIS_LIMIT,
      remaining,
      isPro: false,
    };
  }

  /**
   * Admin function to manually upgrade or downgrade user plan.
   */
  static async setPlanOverride(userId: string, plan: 'FREE' | 'PRO') {
    return await prisma.user.update({
      where: { id: userId },
      data: { plan },
    });
  }
}