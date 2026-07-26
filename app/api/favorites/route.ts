import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { analysisId, isFavorite } = body;

    if (!analysisId) {
      return NextResponse.json({ error: 'Analysis ID required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      analysisId,
      isFavorite: !isFavorite,
      message: 'Favorite status updated successfully.'
    }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}