import Link from 'next/link';
import { ArrowRight, Sparkles, Video, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Background glow overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12 lg:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Introducing CreatorPilot AI v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Skyrocket Your YouTube CTR & Retention <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Before You Press Publish
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
            Stop guessing what works. Get instant AI script analysis, viral retention breakdowns, high-CTR hook options, and thumbnail concepts all in one workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard/analyze"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Analyze Your Script Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white font-semibold text-lg backdrop-blur-md transition-all duration-200 text-center"
            >
              Explore Features
            </Link>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-16">
            {[
              { label: 'Avg CTR Increase', value: '+3.4%' },
              { label: 'Retention Boost', value: '+45s' },
              { label: 'Scripts Analyzed', value: '120,000+' },
              { label: 'Time Saved / Video', value: '3.5 Hrs' },
            ].map((metric, i) => (
              <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-lg">
                <p className="text-2xl sm:text-3xl font-bold text-white">{metric.value}</p>
                <p className="text-sm text-slate-400 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlight Feature Preview */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Built Specifically for High-Growth Creators</h2>
            <p className="text-slate-400 mt-2">Everything you need to engineer viral performance into every video.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">6-Style Hook Generator</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Generate hooks rooted in Curiosity, Story, Shock, and Authority. Never lose a viewer in the first 30 seconds again.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-indigo-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Retention Risk Detection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automatically flag slow introductions, repetitive sections, and weak transitions before filming starts.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-pink-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Algorithmic Viral Score</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get a comprehensive score based on emotional resonance, pacing, CTR potential, and clear call-to-action dynamics.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-slate-900/80 backdrop-blur-xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Optimize Your Next YouTube Upload?</h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Join thousands of YouTube, Shorts, and Educational creators optimizing their content workflow today.
          </p>
          <Link
            href="/dashboard/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors"
          >
            Start Analyzing Script Free <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}