'use client';

import React from 'react';
import { MessageSquare, Star, CheckCircle, Clock } from 'lucide-react';

export default function AdminFeedbackPage() {
  const feedbacks = [
    { id: '1', user: 'alex@creator.io', type: 'Feature Request', text: 'Please add YouTube Shorts transcript auto-fetching from video links directly.', rating: 5, status: 'Open' },
    { id: '2', user: 'sarah@vloglife.com', type: 'Bug Report', text: 'Retention warning flag was cut off on smaller tablet views.', rating: 4, status: 'Resolved' },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-pink-400" />
          User Feedback & Reviews
        </h1>
        <p className="text-slate-400 text-sm mt-1">Review feedback, bug reports, and feature requests submitted by creators.</p>
      </div>

      <div className="space-y-4">
        {feedbacks.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                  {item.type}
                </span>
                <span className="text-xs text-slate-500">{item.user}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{item.text}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>{item.rating} / 5 Rating</span>
              </div>
              <button className="text-purple-400 hover:underline">Mark as Resolved</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}