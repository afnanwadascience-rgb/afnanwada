'use client';

import Link from 'next/link';
import { Users, CreditCard, Cpu, MessageSquare, ShieldAlert, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

export default function AdminDashboardPage() {
  const adminStats = [
    { label: 'Total Registered Users', value: '1,248', change: '+14% this month', icon: Users, color: 'text-purple-400' },
    { label: 'Pro Subscribers', value: '312', change: '25% conversion rate', icon: CreditCard, color: 'text-green-400' },
    { label: 'Monthly AI Token Usage', value: '4.8M', change: '+22% vs last month', icon: Cpu, color: 'text-indigo-400' },
    { label: 'Pending Feedback', value: '18', change: '4 high priority', icon: MessageSquare, color: 'text-pink-400' },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Admin Control Panel
          </div>
          <h1 className="text-3xl font-extrabold text-white">Platform Overview</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                <div className={`p-2 rounded-xl bg-slate-800/80 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-xl transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <Users className="w-6 h-6 text-purple-400" />
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white">User Management</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            View account details, inspect usage counts, and adjust individual user privileges.
          </p>
        </Link>

        <Link
          href="/admin/subscriptions"
          className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-xl transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <CreditCard className="w-6 h-6 text-green-400" />
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white">Manual Subscriptions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upgrade or downgrade user tiers directly in the database without external payment gateways.
          </p>
        </Link>

        <Link
          href="/admin/ai-usage"
          className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-xl transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <Cpu className="w-6 h-6 text-indigo-400" />
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Cost & Usage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Track OpenAI/Claude API usage, latency metrics, and script token limits.
          </p>
        </Link>
      </div>
    </div>
  );
}