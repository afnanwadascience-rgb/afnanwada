import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, newPlan } = body;

    if (!userId || !['Free', 'Pro'].includes(newPlan)) {
      return NextResponse.json({ error: 'Invalid user or subscription plan provided.' }, { status: 400 });
    }

    // Direct database status update logic mock
    return NextResponse.json({
      success: true,
      message: `User ${userId} subscription manually updated to ${newPlan}.`,
      updatedUser: { userId, plan: newPlan, updatedAt: new Date().toISOString() }
    }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Admin override operation failed.' }, { status: 500 });
  }
}