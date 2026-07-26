import { prisma } from '@/lib/prisma';
import { calculateQuota } from '@/lib/analytics';

export class SubscriptionService {
  /**
   * Calculates current quota and plan tier status for a user.
   */
  static async getUserQuotaStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    const isPro = user?.plan === 'PRO';

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyAnalysesCount = await prisma.analysis.count({
      where: {
        userId,
        createdAt: { gte: firstDayOfMonth },
      },
    });

    return calculateQuota(monthlyAnalysesCount, isPro);
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