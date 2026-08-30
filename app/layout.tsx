import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Sparkles, Shield } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorPilot AI | YouTube Script Optimization Suite",
  description:
    "AI-powered script analysis for YouTube creators. Improve CTR, retention, and video SEO before recording.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-extrabold text-lg text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20">
                <Sparkles className="h-4 w-4" />
              </div>

              <span>
                CreatorPilot <span className="text-purple-400">AI</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
              <Link
                href="/features"
                className="transition-colors hover:text-white"
              >
                Features
              </Link>

              <Link
                href="/pricing"
                className="transition-colors hover:text-white"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="transition-colors hover:text-white"
              >
                About
              </Link>

              <Link
                href="/faq"
                className="transition-colors hover:text-white"
              >
                FAQ
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/5 hover:text-white sm:px-4 sm:text-sm"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all hover:bg-purple-500 sm:px-4 sm:text-sm"
              >
                Sign Up
              </Link>

              <Link
                href="/dashboard"
                className="hidden rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-700 sm:px-4 sm:text-sm md:inline-flex"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-white/10 bg-slate-950 py-8 text-xs text-slate-500">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p>© 2026 CreatorPilot AI. Engineered for YouTube creators.</p>

            <div className="flex gap-6">
              <Link href="/contact" className="hover:text-slate-300">
                Contact
              </Link>

              <Link href="/faq" className="hover:text-slate-300">
                FAQ
              </Link>

              <Link
                href="/admin"
                className="flex items-center gap-1 hover:text-slate-300"
              >
                <Shield className="h-3 w-3 text-red-400" />
                Admin
              </Link>
            </div>
          </div>
        </footer>

        <Script
          id="whop-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");whop.setScope("biz_F6es4HVznLQC5p");whop.track("page");`,
          }}
        />
      </body>
    </html>
  );
}