import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mock history query response
  const historyList = [
    { id: '1', title: 'How I Built a $10k/mo AI SaaS in 30 Days', category: 'Business', score: 88, date: '2026-07-22T12:00:00.000Z', isFavorite: true },
    { id: '2', title: '10 YouTube Algorithm Secrets You Never Knew', category: 'Education', score: 94, date: '2026-07-20T15:30:00.000Z', isFavorite: true },
    { id: '3', title: 'I Played Elden Ring with Eye Tracking Only', category: 'Gaming', score: 76, date: '2026-07-18T09:15:00.000Z', isFavorite: false },
  ];

  return NextResponse.json({ success: true, history: historyList }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID parameter' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: `Analysis ${id} deleted successfully` }, { status: 200 });
}