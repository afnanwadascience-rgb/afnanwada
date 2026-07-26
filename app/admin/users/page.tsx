'use client';

import React, { useState } from 'react';
import { Search, UserCheck, Shield, MoreVertical, Trash2, ArrowUpCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const usersList = [
    { id: '1', name: 'Alex Rivera', email: 'alex@creator.io', plan: 'Pro', analyses: 42, joined: 'Jan 12, 2026' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@vloglife.com', plan: 'Free', analyses: 3, joined: 'Feb 04, 2026' },
    { id: '3', name: 'Marcus Brody', email: 'marcus@gamingx.net', plan: 'Pro', analyses: 89, joined: 'Mar 19, 2026' },
    { id: '4', name: 'Elena Rostova', email: 'elena@techreviews.com', plan: 'Free', analyses: 1, joined: 'May 30, 2026' },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">User Management</h1>
        <p className="text-slate-400 text-sm mt-1">Search, audit, and manage registered accounts across CreatorPilot AI.</p>
      </div>

      {/* Filter & Search */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Plan Status</th>
              <th className="px-6 py-4">Total Analyses</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {usersList.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.plan === 'Pro' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">{user.analyses}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
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