import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  FileText,
  Brain,
  Rocket,
  Zap,
  TrendingUp,
  Search,
  Image as ImageIcon,
  Pencil,
  Play,
  GraduationCap,
  BookOpen,
  Video,
  Clapperboard,
  Building2,
  Clock,
  Target,
  BarChart3,
  Type,
  Check,
  ChevronDown,
} from 'lucide-react';

export const metadata = {
  alternates: {
    canonical: 'https://afnanwada-iota.vercel.app/',
  },
};

const howItWorks = [
  {
    step: '1',
    title: 'Paste your script',
    description:
      'Paste any YouTube, Shorts, or long-form script into the analyzer.',
    icon: FileText,
  },
  {
    step: '2',
    title: 'AI analyzes everything',
    description:
      'Hook strength, retention risks, SEO, titles, thumbnail ideas, and viral score.',
    icon: Brain,
  },
  {
    step: '3',
    title: 'Improve & publish',
    description:
      'Copy the suggestions and publish your next video with confidence.',
    icon: Rocket,
  },
];

const features = [
  {
    title: 'Hook Generator',
    description:
      'Generate multiple high-retention opening hooks tailored to your topic and style.',
    icon: Zap,
    color: 'purple',
  },
  {
    title: 'Retention Analysis',
    description:
      'Detect weak sections, slow pacing, and drop-off risks before you hit record.',
    icon: TrendingUp,
    color: 'indigo',
  },
  {
    title: 'Viral Score',
    description:
      'Get a clear score based on emotional impact, pacing, and shareability signals.',
    icon: BarChart3,
    color: 'pink',
  },
  {
    title: 'SEO Optimization',
    description:
      'Receive keyword suggestions and structure tips to rank better in search.',
    icon: Search,
    color: 'violet',
  },
  {
    title: 'Thumbnail Ideas',
    description:
      'Actionable concepts for high-CTR thumbnails that match your improved hooks.',
    icon: ImageIcon,
    color: 'fuchsia',
  },
  {
    title: 'Script Improvements',
    description:
      'Concrete rewrites and line-level suggestions to tighten every part of your script.',
    icon: Pencil,
    color: 'blue',
  },
];

const audiences = [
  {
    title: 'YouTube Creators',
    description: 'Long-form creators who want higher CTR and watch time.',
    icon: Play,
  },
  {
    title: 'Educational Channels',
    description: 'Teachers and explainers who need clearer structure.',
    icon: GraduationCap,
  },
  {
    title: 'Storytelling Channels',
    description: 'Narrative creators focused on emotional retention.',
    icon: BookOpen,
  },
  {
    title: 'Faceless Creators',
    description: 'Automation and niche channels optimizing every script.',
    icon: Video,
  },
  {
    title: 'Shorts Creators',
    description: 'Vertical content that must hook in the first 3 seconds.',
    icon: Clapperboard,
  },
  {
    title: 'Agencies',
    description: 'Teams managing multiple channels and clients at scale.',
    icon: Building2,
  },
];

const benefits = [
  {
    title: 'Save hours of editing',
    description:
      'Fix structural problems before filming instead of in post.',
    icon: Clock,
  },
  {
    title: 'Catch weak hooks early',
    description:
      'Never publish a video with a slow or confusing opening.',
    icon: Target,
  },
  {
    title: 'Improve viewer retention',
    description:
      'Identify and remove the moments that cause drop-offs.',
    icon: TrendingUp,
  },
  {
    title: 'Generate better titles',
    description:
      'Get multiple high-potential title options instantly.',
    icon: Type,
  },
  {
    title: 'Optimize for SEO',
    description:
      'Align your script with what viewers actually search for.',
    icon: Search,
  },
  {
    title: 'Create stronger thumbnails',
    description:
      'Pair powerful hooks with matching visual concepts.',
    icon: ImageIcon,
  },
];

const faqs = [
  {
    question: 'How long does analysis take?',
    answer: 'Most scripts are fully analyzed in about 20 seconds.',
  },
  {
    question: 'Do you support every language?',
    answer:
      'Yes. CreatorPilot AI works with scripts written in any language.',
  },
  {
    question: 'Can I analyze Shorts?',
    answer:
      'Absolutely. Paste short-form scripts and get tailored feedback for vertical content.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'You can start analyzing right away. No credit card is required to try it.',
  },
];

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[160px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========== SECTION 1: Hero ========== */}
        <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>CreatorPilot AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Analyze Your YouTube Script{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Before You Record
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
            Find weak hooks, retention drops, viral opportunities, SEO
            improvements, titles, and thumbnail ideas in under 30 seconds.
          </p>

          {/* Primary internal navigation */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/analyze"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Analyze My Script
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white font-semibold text-lg backdrop-blur-md transition-all duration-200 text-center"
            >
              See Features
            </Link>


          </div>

          <nav
            aria-label="Helpful pages"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
          >
            <Link
              href="/about"
              className="text-slate-400 hover:text-white transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/faq"
              className="text-slate-400 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              No credit card required
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Supports every language
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Results in about 20 seconds
            </span>
          </div>
        </section>

        {/* ========== SECTION 2: How It Works ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How it works
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              Three simple steps from script to stronger video.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {howItWorks.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="relative p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300 group"
                >
                  <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                    Step {item.step}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== SECTION 3: Live Example ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              See what you get
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              A real product-style preview of the analysis you receive in
              seconds.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-purple-900/20 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-slate-950/80">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-slate-500 font-medium">
                CreatorPilot Analysis
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Original Hook
                </p>

                <div className="px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 text-slate-400 text-sm leading-relaxed">
                  &ldquo;Hey guys, today I want to talk about something that
                  might help you grow on YouTube...&rdquo;
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-2">
                  Improved Hook
                </p>

                <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 text-sm leading-relaxed">
                  &ldquo;Most creators lose 70% of viewers in the first 8
                  seconds. Here&apos;s the exact fix that doubled my
                  retention.&rdquo;
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Retention Risk</p>
                  <p className="text-lg font-semibold text-amber-400">
                    Medium → Low
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Viral Score</p>
                  <p className="text-lg font-semibold text-purple-400">
                    72 → 89
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  SEO Suggestions
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    'youtube retention tips',
                    'how to keep viewers watching',
                    'script hooks that work',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                Copy improved hook
              </button>
            </div>
          </div>
        </section>

        {/* ========== SECTION 4: Features ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Everything you need to improve every script
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              Six focused tools that turn a rough draft into a high-performing
              video.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== SECTION 5: Who It's For ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Built for every type of creator
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              Whether you film face-to-camera or run faceless channels, the
              analysis adapts to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map((audience) => {
              const Icon = audience.icon;

              return (
                <div
                  key={audience.title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:border-indigo-500/30 transition-colors"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {audience.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== SECTION 6: Benefits ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why creators use CreatorPilot AI
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              Practical advantages you feel on your next upload.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1.5">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== SECTION 7: FAQ Preview ========== */}
        <section className="py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently asked questions
            </h2>

            <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
              Quick answers to the most common questions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden"
              >
                <div className="px-6 py-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {faq.question}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ========== SECTION 8: Final CTA ========== */}
        <section className="pb-28 pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-900/30 to-slate-900/90 backdrop-blur-xl p-10 sm:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ready to improve your next video?
              </h2>

              <p className="mt-4 text-slate-300 max-w-lg mx-auto text-lg">
                Paste your script and get actionable feedback in about 20
                seconds. No credit card required.
              </p>

              <Link
                href="/dashboard/analyze"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
              >
                Analyze My Script
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}