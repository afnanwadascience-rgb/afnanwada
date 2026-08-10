import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Video, Shield, User } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'CreatorPilot AI | YouTube Script Optimization Suite',
  description: 'AI-powered script analysis for YouTube creators. Improve CTR, retention, and video SEO before recording.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        {/* Navigation Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-white">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>CreatorPilot <span className="text-purple-400">AI</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-white/10 bg-slate-950 py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 CreatorPilot AI. Engineered for YouTube creators.</p>
            <div className="flex gap-6">
              <Link href="/contact" className="hover:text-slate-300">Contact</Link>
              <Link href="/faq" className="hover:text-slate-300">FAQ</Link>
              <Link href="/admin" className="hover:text-slate-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-red-400" /> Admin
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}