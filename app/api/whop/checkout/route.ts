"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/whop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to start checkout.");
        return;
      }

      if (!data.checkoutUrl) {
        setError("Whop did not return a checkout URL.");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium text-blue-400">
              CreatorPilot AI
            </p>

            <h1 className="text-3xl font-bold">
              Upgrade to PRO
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Unlock unlimited script analyses and all PRO features.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">PRO Plan</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Monthly subscription
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">$5</div>
                <div className="text-xs text-slate-400">/month</div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div>✓ Unlimited script analyses</div>
              <div>✓ PRO features unlocked</div>
              <div>✓ Monthly subscription</div>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Opening checkout..." : "Upgrade to PRO — $5/month"}
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            You will be redirected to Whop to securely complete your payment.
          </p>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              ← Back to pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}