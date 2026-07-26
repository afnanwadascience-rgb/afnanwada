import Link from 'next/link';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="py-20 text-center space-y-8 max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
        <Sparkles className="w-4 h-4" />
        <span>Built for YouTube Creators & Editors</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
        Turn Draft Scripts into <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Viral YouTube Videos</span>
      </h1>

      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
        Analyze script retention risks, generate curiosity-driven hooks, and score your titles before filming a single second.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/dashboard/analyze"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
        >
          Analyze Script Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};