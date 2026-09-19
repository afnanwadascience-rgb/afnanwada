import { prisma } from "@/lib/prisma";
import { AIService } from "./ai.service";
import { SubscriptionService } from "./subscription.service";

export class AnalysisService {
  /**
   * Executes a full analysis flow:
   * checks quota, runs AI analysis, and saves the result.
   */
  static async createAnalysis(
    userId: string,
    script: string,
    category: string
  ) {
    // Check user's analysis quota
    const quota = await SubscriptionService.getUserQuotaStatus(userId);

    if (!quota.hasQuota) {
      throw new Error(
        "You have used all 10 free analyses. Upgrade to Pro to continue."
      );
    }

    // Run AI analysis
    const aiResult = await AIService.analyzeScript({
      script,
      category,
    });

    // Save analysis to database
    const record = await prisma.analysis.create({
      data: {
        userId,
        title:
          aiResult.titles[0]?.title ||
          "Untitled Script Analysis",
        category,
        scriptContent: script,
        viralScore: aiResult.overallScore,
        hooks: JSON.stringify(aiResult.hooks),
        titles: JSON.stringify(aiResult.titles),
        retentionAlerts: JSON.stringify(
          aiResult.retentionAlerts
        ),
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
  static async getAnalysisById(
    analysisId: string,
    userId: string
  ) {
    const record = await prisma.analysis.findFirst({
      where: {
        id: analysisId,
        userId,
      },
    });

    if (!record) {
      throw new Error("Analysis record not found.");
    }

    return record;
  }
}