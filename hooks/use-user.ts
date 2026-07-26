'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro';
  avatarUrl?: string;
  quotaRemaining: number;
}

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to fetch profile.');

      setProfile(data.profile);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading user profile.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /**
   * Updates user profile fields.
   */
  const updateProfile = async (updatedData: { name?: string; email?: string }) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update profile.');

      setProfile((prev) => (prev ? { ...prev, ...updatedData } : null));
      return true;
    } catch (err) {
      console.error('Update profile error:', err);
      return false;
    }
  };

  return {
    profile,
    loading,
    error,
    refreshProfile: fetchProfile,
    updateProfile,
  };
}