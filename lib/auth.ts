import { NextRequest } from 'next/server';

export interface UserSession {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  plan: 'FREE' | 'PRO';
}

/**
 * Extracts session context from request headers/cookies.
 * Mock implementation ready for integration with NextAuth, Clerk, or Supabase Auth.
 */
export async function getSession(req?: NextRequest): Promise<UserSession | null> {
  // Demo mock user session
  return {
    id: 'usr_101',
    email: 'creator@example.com',
    role: 'USER',
    plan: 'FREE',
  };
}

/**
 * Verifies if the request originates from an authenticated user.
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const session = await getSession(req);
  return !!session;
}