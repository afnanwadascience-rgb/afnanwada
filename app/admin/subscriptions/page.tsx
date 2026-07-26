'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const [subscribers, setSubscribers] = useState([
    { id: '1', email: 'alex@creator.io', plan: 'Pro', updatedBy: 'Admin', lastChanged: 'Jul 10, 2026' },
    { id: '2', email: 'sarah@vloglife.com', plan: 'Free', updatedBy: 'System', lastChanged: 'Jul 01, 2026' },
    { id: '3', email: 'marcus@gamingx.net', plan: 'Pro', updatedBy: 'Admin', lastChanged: 'Jun 15, 2026' },
  ]);

  const togglePlan = (id: string) => {
    setSubscribers((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const newPlan = sub.plan === 'Pro' ? 'Free' : 'Pro';
          return { ...sub, plan: newPlan, updatedBy: 'Admin', lastChanged: 'Just Now' };
        }
        return sub;
      })
    );
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-green-400" />
          Manual Subscription Control
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Override tier entitlements in the database directly. Designed to decouple billing logic from user rights.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-950/10 text-xs text-amber-300">
        💡 <strong>Note:</strong> Changes take immediate effect in user session context without requiring payment processor API webhooks.
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">User Email</th>
              <th className="px-6 py-4">Current Plan</th>
              <th className="px-6 py-4">Last Modified By</th>
              <th className="px-6 py-4">Updated Date</th>
              <th className="px-6 py-4 text-right">Manual Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-200">{sub.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sub.plan === 'Pro' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {sub.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">{sub.updatedBy}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{sub.lastChanged}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => togglePlan(sub.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                      sub.plan === 'Free'
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {sub.plan === 'Free' ? (
                      <>
                        <ArrowUpRight className="w-3.5 h-3.5" /> Upgrade to Pro
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-3.5 h-3.5" /> Downgrade to Free
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}