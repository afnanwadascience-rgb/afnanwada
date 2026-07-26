'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const SettingsForm = () => {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Default Niche</label>
        <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm">
          <option>Educational / How-To</option>
          <option>YouTube Shorts</option>
          <option>Gaming</option>
          <option>Business & Finance</option>
        </select>
      </div>

      <Button type="submit" variant="primary">
        {saved ? 'Saved!' : 'Save Preferences'}
      </Button>
    </form>
  );
};