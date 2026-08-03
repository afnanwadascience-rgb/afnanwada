'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Get in <span className="text-purple-400">Touch</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a question, feedback, or enterprise inquiry? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Info Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-lg space-y-4">
              <div className="flex items-center gap-3 text-purple-400">
                <Mail className="w-5 h-5" />
                <h3 className="font-semibold text-white">Email Us</h3>
              </div>
              <p className="text-sm text-slate-400">support@tupsar.ai</p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-lg space-y-4">
              <div className="flex items-center gap-3 text-purple-400">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-semibold text-white">Community</h3>
              </div>
              <p className="text-sm text-slate-400">Join our creator Discord community for tips and roadmap discussions.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-slate-400 text-sm">
                  Thanks for reaching out. We usually reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-purple-400 hover:underline pt-4 block mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/25"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}