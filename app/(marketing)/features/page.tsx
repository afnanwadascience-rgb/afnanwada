import Link from 'next/link';
import { Sparkles, Compass, Target, BarChart2, Layers, Search, ShieldAlert, Cpu } from 'lucide-react';

export default function FeaturesPage() {
  const featuresList = [
    {
      icon: Sparkles,
      title: 'AI Script & Transcript Analysis',
      description: 'Deep structural analysis evaluating emotional tone, clarity, storytelling dynamics, and pacing across every paragraph.',
    },
    {
      icon: Target,
      title: 'Multi-Angle Hook Generator',
      description: 'Instantly generate 6 tailored hook styles (Curiosity, Story, Shock, Question, Authority, Emotional) with explicit logic breakdowns.',
    },
    {
      icon: BarChart2,
      title: 'Retention Risk Analysis',
      description: 'Find where viewers are likely to drop off. Detect slow intros, boring transitions, and receive pattern-interrupt recommendations.',
    },
    {
      icon: Compass,
      title: 'Thumbnail & CTR Assistant',
      description: 'Get thumbnail text ideas, focal concept directions, color palette suggestions, and emotional triggers engineered for high click-through.',
    },
    {
      icon: Layers,
      title: 'Composite Viral Score',
      description: 'An actionable overall rating based on pacing, hook strength, clarity, and keyword optimization to quantify viral likelihood.',
    },
    {
      icon: Search,
      title: 'Full SEO & Description Suite',
      description: 'Generate YouTube-optimized descriptions, structured chapter markers, strategic tags, and hashtags targeted to your niche.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Engineered for <span className="text-purple-400">Peak Content Performance</span>
          </h1>
          <p className="text-lg text-slate-400">
            CreatorPilot AI is built around the exact metrics YouTube's recommendation engine prioritizes: CTR and Average Percentage Viewed.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Workflow Showcase Block */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl flex flex-col lg:flex-row items-center gap-10">
          <div className="space-y-4 lg:w-1/2">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Seamless Integration</span>
            <h2 className="text-3xl font-bold text-white">Designed for Channels, Agencies, and Freelancers</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Whether you are creating YouTube Shorts, long-form educational breakdowns, or gaming content, CreatorPilot AI fits directly into your pre-production workflow to eliminate guesswork before editing begins.
            </p>
          </div>
          <div className="lg:w-1/2 w-full p-6 rounded-2xl border border-white/10 bg-slate-950/80 space-y-3 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between text-purple-400 border-b border-slate-800 pb-2">
              <span>[SYSTEM_ANALYSIS_PREVIEW]</span>
              <span>STATUS: READY</span>
            </div>
            <p>✓ Hook Retention Potential: 94/100</p>
            <p>✓ Identified Drop-off Point: Paragraph 4 (Transition weak)</p>
            <p>✓ Recommended Pattern Interrupt: Add visual B-roll / sound effect</p>
            <p className="text-green-400">→ Estimated CTR Improvement: +2.8%</p>
          </div>
        </div>
      </div>
    </div>
  );
}