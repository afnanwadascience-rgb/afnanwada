'use client';

import { BarChart2, TrendingUp, Zap, Sparkles } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Script Performance Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Track score progression, hook performance styles, and channel optimizations.</p>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Average Viral Score</span>
          <div className="text-3xl font-bold text-white">88.2</div>
          <p className="text-xs text-green-400">↑ +5.4% from last month</p>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Top Performing Hook Type</span>
          <div className="text-3xl font-bold text-purple-400">Curiosity</div>
          <p className="text-xs text-slate-400">Used in 62% of high-scoring scripts</p>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Total Optimizations</span>
          <div className="text-3xl font-bold text-white">42 Scripts</div>
          <p className="text-xs text-indigo-400">Estimated 140 hrs research saved</p>
        </div>
      </div>

      {/* Score Progression Graphic Mockup */}
      <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Viral Score Progression
          </h2>
          <span className="text-xs text-slate-400">Last 30 Days</span>
        </div>

        <div className="h-48 flex items-end justify-between gap-2 pt-8 px-4 border-b border-slate-800">
          {[65, 72, 68, 80, 85, 82, 88, 92, 90, 94].map((val, idx) => (
            <div key={idx} className="w-full bg-purple-900/30 rounded-t-lg relative group">
              <div
                style={{ height: `${val}%` }}
                className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all group-hover:brightness-125"
              />
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 border border-slate-700 text-white text-[10px] rounded shadow">
                {val} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}