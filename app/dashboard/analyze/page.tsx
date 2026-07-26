'use client';

import React, { useState } from 'react';
import { Sparkles, Play, ShieldAlert, FileText, CheckCircle2, ChevronRight, Copy, RefreshCw } from 'lucide-react';

export default function ScriptAnalyzePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [scriptText, setScriptText] = useState('');
  const [category, setCategory] = useState('Educational');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setHasResults(true);
    }, 1800);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-400" />
          Script Optimization Studio
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Paste your script or transcript below to generate viral hooks, title scores, and retention fixes.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleAnalyze} className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Video Niche</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-500"
              >
                <option>Educational / How-To</option>
                <option>YouTube Shorts (0-60s)</option>
                <option>Gaming & Entertainment</option>
                <option>Business & Finance</option>
                <option>Tech Review</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Paste Script or Outline
              </label>
              <textarea
                rows={12}
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                placeholder="Paste your video script, transcript, or bulleted ideas here..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-purple-500 placeholder-slate-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing || !scriptText.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzing Script Mechanics...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Run Complete AI Analysis
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {!hasResults ? (
            <div className="h-full min-h-[400px] rounded-3xl border border-dashed border-slate-800 bg-slate-900/20 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <FileText className="w-12 h-12 text-slate-600" />
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-slate-300">No Analysis Generated Yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your video details on the left and click "Run Complete AI Analysis" to see viral hook scores, retention alerts, and titles.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Viral Score Banner */}
              <div className="p-6 rounded-3xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">Overall Potential</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Viral Potential Score</h3>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-extrabold text-green-400">92/100</div>
                  <span className="text-xs text-slate-400">High Optimization</span>
                </div>
              </div>

              {/* Hook Options Box */}
              <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-purple-400 fill-purple-400" />
                  Generated Hook Variations
                </h3>

                <div className="space-y-3">
                  {[
                    { style: 'Curiosity', text: 'Most creators make this $5,000 mistake before even clicking record...' },
                    { style: 'Story', text: 'Three months ago, my YouTube channel was completely dead. Here is what changed everything.' },
                    { style: 'Shock', text: 'Stop wasting time editing your videos until you fix this single line in your script.' },
                  ].map((hook, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-400 uppercase">{hook.style} Hook</span>
                        <button className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </button>
                      </div>
                      <p className="text-sm text-slate-200">{hook.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retention Risk Breakdown */}
              <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                  Retention Drop-off Risks
                </h3>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200 space-y-2">
                  <span className="font-bold">⚠️ Slow Introduction Detected (0:25 - 0:45)</span>
                  <p className="text-slate-300">
                    The background story drags before stating the main payoff. Consider cutting lines 12–16 or adding a fast visual pattern interrupt.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}