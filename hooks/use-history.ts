'use client';

import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
  id: string;
  title: string;
  category: string;
  score: number;
  date: string;
  isFavorite: boolean;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the user history from the backend.
   */
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/history');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to fetch history.');

      setHistory(data.history || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading history.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  /**
   * Toggles favorite status on a script record.
   */
  const toggleFavorite = async (id: string) => {
    const target = history.find((item) => item.id === id);
    if (!target) return;

    // Optimistic UI update
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId: id, isFavorite: target.isFavorite }),
      });

      if (!response.ok) {
        // Revert on failure
        fetchHistory();
      }
    } catch {
      fetchHistory();
    }
  };

  /**
   * Removes an analysis record from history.
   */
  const deleteItem = async (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));

    try {
      const response = await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
      if (!response.ok) fetchHistory();
    } catch {
      fetchHistory();
    }
  };

  return {
    history,
    loading,
    error,
    refreshHistory: fetchHistory,
    toggleFavorite,
    deleteItem,
  };
}