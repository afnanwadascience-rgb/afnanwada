'use client';

import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function ExportsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Export Center</h1>
        <p className="text-slate-400 text-sm mt-1">Download generated script analyses in Markdown, PDF, or JSON format.</p>
      </div>

      <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          Recent Exports
        </h2>

        <div className="space-y-3">
          {[
            { name: 'How_I_Built_a_SaaS_Analysis.pdf', type: 'PDF Report', date: 'Jul 22, 2026' },
            { name: 'Algorithm_Secrets_Script_Hooks.md', type: 'Markdown', date: 'Jul 20, 2026' },
          ].map((exp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{exp.name}</p>
                <p className="text-xs text-slate-500">{exp.type} • {exp.date}</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}