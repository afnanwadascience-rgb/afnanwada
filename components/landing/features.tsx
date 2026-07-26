import { Zap, ShieldAlert, FileText, Sparkles } from 'lucide-react';

export const Features = () => {
  const items = [
    { icon: Zap, title: 'Viral Hook Generator', desc: 'Generate 6 dynamic hook variations optimized for curiosity, story, and shock.' },
    { icon: ShieldAlert, title: 'Retention Drop Detection', desc: 'Identify slow intro sections and weak transitions before you record.' },
    { icon: FileText, title: 'Title & SEO Scoring', desc: 'Score CTR potential and get search-optimized YouTube descriptions.' },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        );
      })}
    </section>
  );
};