import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
        <Compass className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-300">Page Not Found</h2>
        <p className="text-slate-500 text-sm max-w-md">
          The script page or route you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
      </Link>
    </div>
  );
}