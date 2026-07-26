import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 animate-bounce">
        <Sparkles className="w-6 h-6" />
      </div>
      <p className="text-sm font-semibold text-slate-400 animate-pulse">Loading CreatorPilot Workspace...</p>
    </div>
  );
}