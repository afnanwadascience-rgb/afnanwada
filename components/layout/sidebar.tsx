'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, History, BarChart2, Star, Settings, User, Download, Shield } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Script', href: '/dashboard/analyze', icon: Zap },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Star },
    { name: 'Exports', href: '/dashboard/exports', icon: Download },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-slate-950 p-6 flex flex-col justify-between hidden md:flex min-h-screen">
      <div className="space-y-6">
        <div className="px-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Navigation</span>
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-900">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Shield className="w-4 h-4" /> Admin Portal
        </Link>
      </div>
    </aside>
  );
};