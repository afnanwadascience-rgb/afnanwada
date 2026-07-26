import { prisma } from '@/lib/prisma';

export class UserService {
  /**
   * Fetches full user profile details.
   */
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
      },
    });

    if (!user) throw new Error('User profile not found.');
    return user;
  }

  /**
   * Updates user profile info.
   */
  static async updateProfile(userId: string, data: { name?: string; email?: string }) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}