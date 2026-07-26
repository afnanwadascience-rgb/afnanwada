import { UserSession } from './auth';

/**
 * Checks if session user has admin level privileges.
 */
export function isAdmin(session: UserSession | null): boolean {
  return session?.role === 'ADMIN';
}

/**
 * Checks if session user has an active Pro tier membership.
 */
export function isProUser(session: UserSession | null): boolean {
  return session?.plan === 'PRO';
}

/**
 * Verifies if user can access an export or analysis resource.
 */
export function canAccessResource(session: UserSession | null, resourceOwnerId: string): boolean {
  if (!session) return false;
  if (isAdmin(session)) return true;
  return session.id === resourceOwnerId;
}