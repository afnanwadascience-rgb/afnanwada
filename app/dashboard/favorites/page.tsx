'use client';

import { Star, Play, Copy, ExternalLink } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = [
    { id: '1', title: 'How I Built a $10k/mo AI SaaS in 30 Days', category: 'Business', score: 88, date: 'Jul 22, 2026' },
    { id: '2', title: '10 YouTube Algorithm Secrets You Never Knew', category: 'Education', score: 94, date: 'Jul 20, 2026' },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          Starred Scripts
        </h1>
        <p className="text-slate-400 text-sm mt-1">Quick access to your highest-performing video analyses.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {favorites.map((item) => (
          <div key={item.id} className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
                {item.category}
              </span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>

            <h3 className="text-lg font-bold text-white">{item.title}</h3>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Score: <strong className="text-green-400 text-sm">{item.score}/100</strong>
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors">
                Open Analysis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}