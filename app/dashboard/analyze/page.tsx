"use client";

import React, { useState } from "react";
import { Loader2, Sparkles, Copy, Check, ArrowRight, Tag, TrendingUp, ShieldAlert, Zap, LayoutTemplate } from "lucide-react";

interface HookItem {
  style: string;
  text: string;
  rationale: string;
}

interface TitleItem {
  title: string;
  ctrScore: number;
  seoScore: number;
  readabilityScore: number;
}

interface ThumbnailConcepts {
  textIdeas: string[];
  concept: string;
  colorPalette: string[];
  emotionalFocus: string;
}

interface RetentionAnalysis {
  slowIntros: string[];
  weakTransitions: string[];
  patternInterrupts: string[];
}

interface SeoDescription {
  fullText: string;
  keywords: string[];
  hashtags: string[];
}

interface AnalysisData {
  viralScore: number;
  hooks: HookItem[];
  titles: TitleItem[];
  thumbnailConcepts: ThumbnailConcepts;
  retentionAnalysis: RetentionAnalysis;
  seoDescription: SeoDescription;
}

export default function AnalyzePage() {
  const [script, setScript] = useState("");
  const [category, setCategory] = useState("Tech & Education");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) {
      setError("Please enter a script to analyze.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script,
          category,
        }),
      });

      const resData = await response.json();
      console.log("API RESPONSE:");
      console.log(resData);

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to analyze script");
      }

      setAnalysisResult(resData.data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderList = (items: string[] | undefined) => {
    if (!items || !Array.isArray(items)) return <p className="text-slate-300">None identified</p>;
    return (
      <ul className="list-disc list-inside space-y-1 text-slate-300">
        {items.map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              AI Script Analyzer
            </h1>
            <p className="text-slate-400 mt-1">
              Paste your video script and category below to generate viral hooks, tailored titles, retention breakdown, and SEO strategies.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="script" className="block text-sm font-medium text-slate-300 mb-2">
                Your Video Script
              </label>
              <textarea
                id="script"
                rows={7}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Paste your full video script here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                  Content Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="Tech & Education">Tech & Education</option>
                  <option value="Entertainment & Vlogs">Entertainment & Vlogs</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Lifestyle & Health">Lifestyle & Health</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Script
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-950/50 border border-red-800 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Results Section */}
        {analysisResult && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Viral Score Card */}
            {analysisResult.viralScore !== undefined && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    Estimated Viral Score
                  </h3>
                  <p className="text-sm text-slate-400">Calculated based on hooks, pacing potential, and emotional resonance.</p>
                </div>
                <div className="text-3xl font-extrabold text-indigo-400 bg-indigo-950/50 px-6 py-3 rounded-xl border border-indigo-800/50">
                  {analysisResult.viralScore}/100
                </div>
              </div>
            )}

            {/* Hooks */}
            {analysisResult.hooks && analysisResult.hooks.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  Top Viral Hooks
                </h3>
                <div className="grid gap-4">
                  {analysisResult.hooks.map((hook, idx) => {
                    const uniqueKey = `hook-${idx}`;
                    return (
                      <div key={idx} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-800/50">
                            {hook.style}
                          </span>
                          <button
                            onClick={() => copyToClipboard(hook.text, uniqueKey)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                            title="Copy hook text"
                          >
                            {copiedIndex === uniqueKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-slate-100 font-semibold text-lg">{hook.text}</p>
                        <p className="text-sm text-slate-400"><strong className="text-slate-300">Rationale:</strong> {hook.rationale}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Titles */}
            {analysisResult.titles && analysisResult.titles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Optimized Video Titles</h3>
                <div className="grid gap-4">
                  {analysisResult.titles.map((titleObj, idx) => {
                    const uniqueKey = `title-${idx}`;
                    return (
                      <div key={idx} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-slate-100 font-bold text-lg">{titleObj.title}</p>
                          <button
                            onClick={() => copyToClipboard(titleObj.title, uniqueKey)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors shrink-0 cursor-pointer"
                            title="Copy title"
                          >
                            {copiedIndex === uniqueKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300 pt-2 border-t border-slate-800/80">
                          <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                            CTR Score: <strong className="text-indigo-400">{titleObj.ctrScore}%</strong>
                          </span>
                          <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                            SEO Score: <strong className="text-indigo-400">{titleObj.seoScore}%</strong>
                          </span>
                          <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                            Readability Score: <strong className="text-indigo-400">{titleObj.readabilityScore}%</strong>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Thumbnail Concepts */}
            {analysisResult.thumbnailConcepts && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-indigo-400" />
                  Thumbnail Concept Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Visual Concept</span>
                    <p className="text-slate-300">{analysisResult.thumbnailConcepts.concept}</p>
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Emotional Focus</span>
                    <p className="text-slate-300">{analysisResult.thumbnailConcepts.emotionalFocus}</p>
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">On-Screen Text Ideas</span>
                    {renderList(analysisResult.thumbnailConcepts.textIdeas)}
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Color Palette</span>
                    {renderList(analysisResult.thumbnailConcepts.colorPalette)}
                  </div>
                </div>
              </div>
            )}

            {/* Retention Analysis */}
            {analysisResult.retentionAnalysis && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  Retention & Pacing Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Slow Intros / Risk Points</span>
                    {renderList(analysisResult.retentionAnalysis.slowIntros)}
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Weak Transitions</span>
                    {renderList(analysisResult.retentionAnalysis.weakTransitions)}
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Pattern Interrupts Recommended</span>
                    {renderList(analysisResult.retentionAnalysis.patternInterrupts)}
                  </div>
                </div>
              </div>
            )}

            {/* SEO Description */}
            {analysisResult.seoDescription && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-indigo-400" />
                  SEO Description & Tags
                </h3>
                {analysisResult.seoDescription.fullText && (
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Optimized Description</span>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{analysisResult.seoDescription.fullText}</p>
                  </div>
                )}
                {analysisResult.seoDescription.keywords && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Keywords</span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(analysisResult.seoDescription.keywords) ? (
                        analysisResult.seoDescription.keywords.map((kw, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-800 text-indigo-300 rounded-full text-xs font-medium border border-slate-700">
                            {kw}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-300 text-sm">{analysisResult.seoDescription.keywords}</p>
                      )}
                    </div>
                  </div>
                )}
                {analysisResult.seoDescription.hashtags && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hashtags</span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(analysisResult.seoDescription.hashtags) ? (
                        analysisResult.seoDescription.hashtags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full text-xs font-medium border border-indigo-800/50">
                            #{tag.replace(/^#/, "")}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-300 text-sm">{analysisResult.seoDescription.hashtags}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}