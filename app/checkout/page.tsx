"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpgrade() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/whop/checkout", {
        method: "POST",
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
    } catch (error) {
      console.error(error);
      setError("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          CreatorPilot AI PRO
        </h1>

        <p className="text-slate-400 mb-6">
          Upgrade to PRO for $5/month and unlock unlimited script analyses.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Opening Whop checkout..." : "Upgrade to PRO — $5/month"}
        </button>

        <Link
          href="/pricing"
          className="mt-6 inline-block text-sm text-slate-400 hover:text-white"
        >
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}
