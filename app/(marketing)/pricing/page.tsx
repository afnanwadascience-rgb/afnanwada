import Link from 'next/link';
import { Check, Sparkles, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free Starter',
      badge: 'Ideal for trying out',
      price: '$0',
      period: 'forever',
      description: 'Essential script feedback and basic hooks to help beginner creators improve video metrics.',
      features: [
        '3 Script Analyses per month',
        'Basic Hook Generator (2 styles)',
        'Overall Viral Score calculation',
        'Standard YouTube Description generator',
        'History storage for last 5 analyses',
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/dashboard',
      highlighted: false,
    },
    {
      name: 'Pro Creator',
      badge: 'Most Popular',
      price: '$29',
      period: 'per month',
      description: 'Full power optimizations for serious creators, channel managers, and video editors.',
      features: [
        'Unlimited Script & Transcript Analyses',
        '6-Style Viral Hook Generator',
        'Deep Retention & Drop-off Detection',
        'CTR & Thumbnail Concept Assistant',
        'Advanced SEO & Auto-Chapters Generator',
        'Export to Markdown, PDF, and Text',
        'Unlimited Project Search & History',
        'Priority AI Processing Speed',
      ],
      ctaText: 'Upgrade to Pro',
      ctaHref: '/dashboard',
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Simple, Transparent <span className="text-purple-400">Plans</span>
          </h1>
          <p className="text-lg text-slate-400">
            Choose the plan that best matches your YouTube uploading schedule. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'border-purple-500 bg-slate-900/80 shadow-2xl shadow-purple-500/10 backdrop-blur-xl'
                  : 'border-white/10 bg-slate-900/40 backdrop-blur-lg hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-800">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Subscriptions */}
        <div className="text-center text-xs text-slate-500 max-w-md mx-auto">
          Need custom enterprise options for a large agency team? Contact our team directly to set up tailored account limits.
        </div>
      </div>
    </div>
  );
}