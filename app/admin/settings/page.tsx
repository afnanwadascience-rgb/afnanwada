'use client';

import { Settings, Shield, Key, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Global Platform Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage global AI constraints, free-tier limits, and system maintenance switches.</p>
      </div>

      <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
            Free Tier Monthly Limit (Analyses)
          </label>
          <input
            type="number"
            defaultValue={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Maintenance Mode</h3>
            <p className="text-xs text-slate-400">Temporarily restrict new script analyses for upgrades.</p>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-purple-600 rounded" />
        </div>
      </div>
    </div>
  );
}