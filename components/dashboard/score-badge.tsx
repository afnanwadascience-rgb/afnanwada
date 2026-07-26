import React from 'react';

export const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 90) return 'text-green-400 border-green-500/30 bg-green-950/20';
    if (score >= 75) return 'text-purple-400 border-purple-500/30 bg-purple-950/20';
    return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
  };

  return (
    <div className={`px-4 py-2 rounded-2xl border ${getColor()} text-center`}>
      <div className="text-2xl font-extrabold">{score}</div>
      <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Viral Index</div>
    </div>
  );
};