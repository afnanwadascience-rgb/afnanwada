'use client';

import Link from 'next/link';
import { Sparkles, TrendingUp, Video, Zap, ArrowRight, Clock, Star, Play } from 'lucide-react';

export default function DashboardOverviewPage() {
  const recentProjects = [
    { id: '1', title: 'How I Built a $10k/mo AI SaaS in 30 Days', category: 'Business', score: 88, date: '2 hours ago', isFavorite: true },
    { id: '2', title: '10 YouTube Algorithm Secrets You Never Knew', category: 'Education', score: 94, date: ' Yesterday', isFavorite: true },
    { id: '3', title: 'I Played Elden Ring with Eye Tracking Only', category: 'Gaming', score: 76, date: '3 days ago', isFavorite: false },
    { id: '4', title: 'Stop Making This Thumbnail Mistake (Shorts)', category: 'Shorts', score: 82, date: '5 days ago', isFavorite: false },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-slate-900/80 to-slate-950 backdrop-blur-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Ready for Next Upload</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome back, Creator! 👋</h1>
          <p className="text-slate-400 text-sm max-w-xl">
            You have <strong>2 Free Analyses</strong> remaining this month. Upgrade to Pro for unlimited script optimization.
          </p>
        </div>
        <div className="z-10 flex items-center gap-3">
          <Link
            href="/dashboard/analyze"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0"
          >
            <Zap className="w-4 h-4" />
            Analyze New Script
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Analyses', value: '28', change: '+12% this month', icon: Video, color: 'text-purple-400' },
          { label: 'Avg Viral Score', value: '86.4', change: '+4.2 pts improvement', icon: Sparkles, color: 'text-green-400' },
          { label: 'Weekly Script Usage', value: '6 / 10', change: '60% quota used', icon: Zap, color: 'text-indigo-400' },
          { label: 'Avg Retention Potential', value: '68%', change: '+8% vs benchmarks', icon: TrendingUp, color: 'text-pink-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                <div className={`p-2 rounded-xl bg-slate-800/80 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Projects & Quick Tools Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Projects
            </h2>
            <Link href="/dashboard/history" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-purple-500/40 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Play className="w-4 h-4 fill-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{project.category}</span>
                      <span>•</span>
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Viral Score</div>
                    <div className={`text-sm font-bold ${project.score >= 85 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {project.score}/100
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-yellow-400 transition-colors">
                    <Star className={`w-4 h-4 ${project.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Hub */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            Quick Optimization
          </h2>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Want to quickly score a video title or test hook variations before writing the full script?
            </p>

            <Link
              href="/dashboard/analyze"
              className="block w-full text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
            >
              Test Title & Hooks Only
            </Link>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300 space-y-2">
              <span className="font-semibold text-purple-200">💡 Creator Tip of the Day:</span>
              <p className="text-slate-300">
                Pattern interrupts in the first 45 seconds boost initial viewer retention by up to 22%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}