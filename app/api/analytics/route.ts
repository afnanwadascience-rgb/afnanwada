import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userAnalytics = {
    totalAnalyses: 28,
    avgViralScore: 86.4,
    monthlyQuotaUsed: 6,
    monthlyQuotaLimit: 10,
    topHooksUsed: ['Curiosity', 'Story', 'Shock'],
    scoreTrend: [
      { date: 'Jul 01', score: 72 },
      { date: 'Jul 08', score: 80 },
      { date: 'Jul 15', score: 85 },
      { date: 'Jul 22', score: 91 },
    ],
  };

  return NextResponse.json({ success: true, analytics: userAnalytics }, { status: 200 });
}