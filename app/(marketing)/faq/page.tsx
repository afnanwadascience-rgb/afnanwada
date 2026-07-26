import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How does CreatorPilot AI analyze my video scripts?',
      answer:
        'CreatorPilot AI processes your script using tailored AI models trained on top-performing YouTube retention patterns, storytelling arcs, and high-CTR headline structures.',
    },
    {
      question: 'Can I upload video transcripts instead of raw scripts?',
      answer:
        'Yes! You can paste raw text transcripts, YouTube auto-generated captions, or rough bulleted outlines to get detailed retention and hook feedback.',
    },
    {
      question: 'Is CreatorPilot AI suitable for YouTube Shorts?',
      answer:
        'Absolutely. Our hook generator and retention engine include specific presets optimized for short-form video pacing (0-60s videos).',
    },
    {
      question: 'Does the Viral Score guarantee my video will go viral?',
      answer:
        'No tool can guarantee algorithm behavior, but the Viral Score benchmarks your script against key algorithmic drivers (pacing, retention risks, hook strength, and title curiosity) to maximize performance odds.',
    },
    {
      question: 'How does subscription upgrading work?',
      answer:
        'Pro plan features are managed through your account portal. Accounts can be easily upgraded or configured by account managers as needed.',
    },
    {
      question: 'Can I export my reports for my video editing team?',
      answer:
        'Yes, you can export full analyses including chapter markers, pattern interrupts, and thumbnail concepts into Markdown or clean PDF summaries.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Frequently Asked <span className="text-purple-400">Questions</span>
          </h1>
          <p className="text-slate-400">
            Got questions about how CreatorPilot AI helps you optimize your YouTube content? We have answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md space-y-2"
            >
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="p-8 rounded-2xl border border-purple-500/20 bg-purple-900/10 text-center space-y-3">
          <p className="text-white font-medium">Still have questions?</p>
          <p className="text-xs text-slate-400">
            Feel free to contact our creator support team anytime.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}