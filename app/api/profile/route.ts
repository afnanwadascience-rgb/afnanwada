import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const profile = {
    id: 'usr_101',
    name: 'Creator Account',
    email: 'creator@example.com',
    plan: 'Free',
    avatarUrl: '/images/avatar-placeholder.png',
    quotaRemaining: 2,
  };

  return NextResponse.json({ success: true, profile }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  return NextResponse.json({
    success: true,
    message: 'Profile updated successfully',
    updated: { name }
  }, { status: 200 });
}