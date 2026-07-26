import Link from 'next/link';
import { Target, Users, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Empowering Creators with <span className="text-purple-400">Data-Driven Precision</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We built CreatorPilot AI to bridged the gap between creative storytelling and algorithmic growth mechanics on YouTube.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3 text-purple-400">
            <Target className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-base">
            Every day, millions of hours of valuable video content go unseen because of weak hooks, confusing pacing, or suboptimal title positioning. Traditional tools focus only on keyword search volume after production is complete.
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            <strong>CreatorPilot AI</strong> steps in at the pre-production stage—analyzing video scripts before filming ever begins. Our goal is to ensure creators never spend dozens of hours editing a video destined to fail due to avoidable structural flaws.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Pre-Production Focus</h3>
            <p className="text-sm text-slate-400">
              Fix retention issues and pacing gaps while your script is still editable text, saving hours on re-shoots.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <Users className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Built for All Niches</h3>
            <p className="text-sm text-slate-400">
              Tested across Gaming, Finance, Education, Shorts, and Vlog channels to ensure broad algorithmic optimization.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <Award className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Creator First</h3>
            <p className="text-sm text-slate-400">
              Designed to amplify human creative expression, not replace it with generic, artificial content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}