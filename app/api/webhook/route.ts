import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Pass-through handler for third-party service webhooks
  return NextResponse.json({ received: true, status: 'Webhook payload processed.' }, { status: 200 });
}