import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon: Icon, color = 'text-purple-400' }) => {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <div className={`p-2 rounded-xl bg-slate-800/80 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-white">{value}</p>
      <p className="text-xs text-slate-500">{change}</p>
    </div>
  );
};