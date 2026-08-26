import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          Simple pricing
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Choose your plan
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto mb-12">
          Start with 10 free script analyses. Upgrade to PRO when you need
          more.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* FREE */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-left">
            <h2 className="text-2xl font-bold mb-2">Free</h2>

            <p className="text-slate-400 mb-6">
              Try CreatorPilot AI before upgrading.
            </p>

            <div className="text-4xl font-extrabold mb-6">
              $0
            </div>

            <ul className="space-y-3 text-slate-300 mb-8">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                10 script analyses
              </li>

              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                YouTube script analysis
              </li>

              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                Hooks and title suggestions
              </li>
            </ul>

            <Link
              href="/dashboard"
              className="block text-center w-full rounded-xl border border-white/10 py-3 font-semibold hover:bg-white/5 transition"
            >
              Start Free
            </Link>
          </div>

          {/* PRO */}
          <div className="rounded-2xl border border-purple-500/40 bg-slate-900 p-8 text-left shadow-xl shadow-purple-900/20">
            <div className="text-sm font-semibold text-purple-400 mb-2">
              RECOMMENDED
            </div>

            <h2 className="text-2xl font-bold mb-2">PRO</h2>

            <p className="text-slate-400 mb-6">
              For creators who need unlimited analysis.
            </p>

            <div className="text-4xl font-extrabold mb-1">
              $5
              <span className="text-base font-normal text-slate-400">
                /month
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-6">
              Monthly recurring subscription
            </p>

            <ul className="space-y-3 text-slate-300 mb-8">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                Unlimited analyses
              </li>

              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                Advanced script analysis
              </li>

              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                Hooks and titles
              </li>

              <li className="flex gap-2">
                <Check className="w-5 h-5 text-green-400" />
                SEO recommendations
              </li>
            </ul>

            <Link
              href="/checkout"
              className="block text-center w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 font-semibold transition"
            >
              Upgrade to PRO
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-8">
          You can use the free plan without entering payment information.
        </p>
      </div>
    </div>
  );
}