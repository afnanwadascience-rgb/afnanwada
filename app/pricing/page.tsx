import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
            CreatorPilot AI
          </p>

          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Simple pricing for creators
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Start with 10 free script analyses. Upgrade when you need more.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Free</h2>

            <div className="mt-5">
              <span className="text-4xl font-extrabold">$0</span>
            </div>

            <p className="mt-3 text-slate-400">
              Try CreatorPilot AI before upgrading.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li>✓ 10 free script analyses</li>
              <li>✓ Script optimization</li>
              <li>✓ Basic YouTube recommendations</li>
              <li>✓ No credit card required</li>
            </ul>

            <Link
              href="/dashboard"
              className="mt-8 block rounded-xl border border-white/10 px-5 py-3 text-center font-semibold transition hover:bg-white/5"
            >
              Start Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl border border-purple-500/40 bg-slate-900 p-8 shadow-2xl shadow-purple-900/20">
            <div className="absolute -top-3 left-6 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold">
              PRO
            </div>

            <h2 className="text-2xl font-bold">Creator Pro</h2>

            <div className="mt-5">
              <span className="text-4xl font-extrabold">$5</span>
              <span className="text-slate-400">/month</span>
            </div>

            <p className="mt-3 text-slate-400">
              For creators who need regular script optimization.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li>✓ More script analyses</li>
              <li>✓ Advanced optimization</li>
              <li>✓ CTR recommendations</li>
              <li>✓ Retention recommendations</li>
              <li>✓ YouTube SEO suggestions</li>
            </ul>

            {/* Connect this button to your Whop checkout */}
            <Link
              href="/upgrade"
              className="mt-8 block rounded-xl bg-purple-600 px-5 py-3 text-center font-semibold transition hover:bg-purple-500"
            >
              Upgrade for $5/month
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}