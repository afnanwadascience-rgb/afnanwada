import { prisma } from '@/lib/prisma';
import { AIService } from './ai.service';
import { SubscriptionService } from './subscription.service';

export class AnalysisService {
  /**
   * Executes a full analysis flow: checks quota, runs AI analysis, and saves result to DB.
   */
  static async createAnalysis(userId: string, script: string, category: string) {
    // 1. Verify user quota access
    const quota = await SubscriptionService.getUserQuotaStatus(userId);
    if (!quota.hasQuota) {
      throw new Error('Monthly analysis quota reached. Upgrade to Pro for unlimited analyses.');
    }

    // 2. Process AI Evaluation
    const aiResult = await AIService.analyzeScript({ script, category });

    // 3. Save to database via Prisma
    const record = await prisma.analysis.create({
      data: {
        userId,
        title: aiResult.titles[0]?.title || 'Untitled Script Analysis',
        category,
        scriptContent: script,
        viralScore: aiResult.overallScore,
        hooks: JSON.stringify(aiResult.hooks),
        titles: JSON.stringify(aiResult.titles),
        retentionAlerts: JSON.stringify(aiResult.retentionAlerts),
        seoDescription: aiResult.seoDescription,
      },
    });

    return {
      id: record.id,
      createdAt: record.createdAt,
      category: record.category,
      viralScore: record.viralScore,
      data: aiResult,
    };
  }

  /**
   * Fetches a specific analysis record by ID.
   */
  static async getAnalysisById(analysisId: string, userId: string) {
    const record = await prisma.analysis.findFirst({
      where: { id: analysisId, userId },
    });

    if (!record) {
      throw new Error('Analysis record not found.');
    }

    return record;
  }
}