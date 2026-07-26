'use client';

import { Settings, Sliders, Bell, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Workspace Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure default AI parameters and preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            AI Default Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Default Niche</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm">
                <option>Educational / How-To</option>
                <option>YouTube Shorts</option>
                <option>Gaming</option>
                <option>Business</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Preferred Hook Tone</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm">
                <option>Curiosity Driven</option>
                <option>High Energy & Urgent</option>
                <option>Story Driven</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}