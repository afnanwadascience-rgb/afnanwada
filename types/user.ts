export type UserRole = 'USER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  role: UserRole;
  plan: 'FREE' | 'PRO';
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  plan: 'FREE' | 'PRO';
}

export interface UpdateUserProfilePayload {
  name?: string;
  email?: string;
  image?: string;
}