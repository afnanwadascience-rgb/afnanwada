import { prisma } from '@/lib/prisma';
import { calculateAverageScore } from '@/lib/analytics';

export class AnalyticsService {
  /**
   * Computes aggregated usage and viral metrics for the dashboard.
   */
  static async getUserDashboardMetrics(userId: string) {
    const analyses = await prisma.analysis.findMany({
      where: { userId },
      select: { viralScore: true, createdAt: true, category: true },
    });

    const totalAnalyses = analyses.length;
    const scores = analyses.map((a) => a.viralScore);
    const avgViralScore = calculateAverageScore(scores);

    // Get current month count
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyCount = analyses.filter((a) => new Date(a.createdAt) >= firstDayOfMonth).length;

    return {
      totalAnalyses,
      avgViralScore,
      monthlyCount,
      recentCount: analyses.slice(0, 5).length,
    };
  }
}