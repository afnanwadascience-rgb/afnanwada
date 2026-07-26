'use client';

import { Cpu, Activity, Zap, Server } from 'lucide-react';

export default function AdminAIUsagePage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Cpu className="w-8 h-8 text-indigo-400" />
          AI Token & API Monitor
        </h1>
        <p className="text-slate-400 text-sm mt-1">Monitor real-time prompt tokens, completion costs, and API response latency.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400">Monthly Tokens Used</span>
          <p className="text-3xl font-bold text-white">4,820,110</p>
          <span className="text-xs text-purple-400">~ $96.40 API Cost</span>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400">Avg Response Time</span>
          <p className="text-3xl font-bold text-green-400">1.42s</p>
          <span className="text-xs text-slate-500">Optimal model latency</span>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-2">
          <span className="text-xs text-slate-400">Primary AI Model</span>
          <p className="text-3xl font-bold text-indigo-400">GPT-4o</p>
          <span className="text-xs text-slate-500">Fallback: Claude 3.5 Sonnet</span>
        </div>
      </div>
    </div>
  );
}