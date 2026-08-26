import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          CreatorPilot AI PRO
        </h1>

        <p className="text-slate-400 mb-6">
          Upgrade to PRO for $5/month and unlock unlimited script analyses.
        </p>

        <p className="text-yellow-400 text-sm mb-6">
          Whop checkout integration coming next.
        </p>

        <Link
          href="/pricing"
          className="inline-block rounded-xl border border-white/10 px-6 py-3 hover:bg-white/5"
        >
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}