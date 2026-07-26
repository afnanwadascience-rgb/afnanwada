import React from 'react';

export const RetentionChart = () => {
  const data = [100, 85, 70, 65, 62, 58, 60, 64, 63, 61];

  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl space-y-4">
      <h3 className="text-sm font-bold text-white">Estimated Audience Retention</h3>
      <div className="h-40 flex items-end justify-between gap-1 pt-6 px-2 border-b border-slate-800">
        {data.map((val, idx) => (
          <div key={idx} className="w-full bg-slate-800/50 rounded-t h-full flex items-end">
            <div
              style={{ height: `${val}%` }}
              className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t"
            />
          </div>
        ))}
      </div>
    </div>
  );
};