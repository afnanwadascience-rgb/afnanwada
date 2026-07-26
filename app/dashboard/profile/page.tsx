'use client';

import { User, Shield, Zap, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Account Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your creator profile and subscription status.</p>
      </div>

      <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xl font-bold">
            CP
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Creator Account</h2>
            <p className="text-xs text-slate-400">creator@example.com</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-300 uppercase font-semibold">Current Subscription</span>
            <h3 className="text-xl font-bold text-white mt-1">Free Tier Plan</h3>
            <p className="text-xs text-slate-400 mt-1">3 Script Analyses / Month limit</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}