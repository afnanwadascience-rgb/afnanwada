'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Hook {
  style: string;
  text: string;
}

export const HookSelector: React.FC<{ hooks: Hook[] }> = ({ hooks }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-3">
      {hooks.map((hook, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{hook.style} Hook</span>
            <button
              onClick={() => handleCopy(hook.text, idx)}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIdx === idx ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-slate-200">{hook.text}</p>
        </div>
      ))}
    </div>
  );
};