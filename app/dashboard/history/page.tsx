'use client';

import React, { useState } from 'react';
import { Search, Star, Trash2, Copy, Download, ExternalLink } from 'lucide-react';

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const historyItems = [
    { id: '1', title: 'How I Built a $10k/mo AI SaaS in 30 Days', category: 'Business', score: 88, date: 'Jul 22, 2026', favorite: true },
    { id: '2', title: '10 YouTube Algorithm Secrets You Never Knew', category: 'Education', score: 94, date: 'Jul 20, 2026', favorite: true },
    { id: '3', title: 'I Played Elden Ring with Eye Tracking Only', category: 'Gaming', score: 76, date: 'Jul 18, 2026', favorite: false },
    { id: '4', title: 'Stop Making This Thumbnail Mistake (Shorts)', category: 'Shorts', score: 82, date: 'Jul 12, 2026', favorite: false },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Analysis History</h1>
          <p className="text-slate-400 text-sm mt-1">Manage, search, and export all your past video script reports.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search previous scripts by title or category..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
        />
      </div>

      {/* History Items List */}
      <div className="space-y-3">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-semibold">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400">Viral Score</div>
                <div className="text-sm font-extrabold text-green-400">{item.score}/100</div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-2 rounded-lg hover:bg-slate-800 hover:text-yellow-400 transition-colors">
                  <Star className={`w-4 h-4 ${item.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-800 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}