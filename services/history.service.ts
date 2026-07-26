import { prisma } from '@/lib/prisma';

export class HistoryService {
  /**
   * Retrieves all past analyses for a user with optional search filtering.
   */
  static async getUserHistory(userId: string, searchQuery?: string) {
    return await prisma.analysis.findMany({
      where: {
        userId,
        ...(searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery, mode: 'insensitive' } },
                { category: { contains: searchQuery, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        viralScore: true,
        isFavorite: true,
        createdAt: true,
      },
    });
  }

  /**
   * Toggles favorite status on an analysis.
   */
  static async toggleFavorite(userId: string, analysisId: string) {
    const existing = await prisma.analysis.findFirst({
      where: { id: analysisId, userId },
    });

    if (!existing) throw new Error('Record not found.');

    return await prisma.analysis.update({
      where: { id: analysisId },
      data: { isFavorite: !existing.isFavorite },
    });
  }

  /**
   * Deletes a user analysis record.
   */
  static async deleteAnalysis(userId: string, analysisId: string) {
    return await prisma.analysis.deleteMany({
      where: { id: analysisId, userId },
    });
  }
}