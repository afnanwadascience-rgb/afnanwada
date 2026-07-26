import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface Risk {
  timestamp: string;
  issue: string;
  suggestion: string;
}

export const RetentionAlerts: React.FC<{ risks: Risk[] }> = ({ risks }) => {
  return (
    <div className="space-y-3">
      {risks.map((risk, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Drop-off Risk at {risk.timestamp}</span>
          </div>
          <p className="text-slate-300"><strong>Issue:</strong> {risk.issue}</p>
          <p className="text-amber-200/80"><strong>Fix:</strong> {risk.suggestion}</p>
        </div>
      ))}
    </div>
  );
};