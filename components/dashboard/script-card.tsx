import React from 'react';
import { Star, Play, Clock } from 'lucide-react';

interface ScriptCardProps {
  id: string;
  title: string;
  category: string;
  score: number;
  date: string;
  isFavorite: boolean;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ title, category, score, date, isFavorite }) => {
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-purple-500/40 transition-all flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
          <Play className="w-4 h-4 fill-purple-400" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <div className="text-xs text-slate-400">Viral Score</div>
          <div className={`text-sm font-bold ${score >= 85 ? 'text-green-400' : 'text-amber-400'}`}>
            {score}/100
          </div>
        </div>
        <button className="text-slate-500 hover:text-yellow-400 transition-colors">
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        </button>
      </div>
    </div>
  );
};