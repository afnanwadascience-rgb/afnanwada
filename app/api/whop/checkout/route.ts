import { NextResponse } from "next/server";
import { WhopClient } from "@whop/sdk";

import { auth } from "@/auth";
export const dynamic = "force-dynamic";

// Set WHOP_PLAN_ID in your server environment to the existing CreatorPilot AI
// PRO plan ID from the Whop dashboard (Dashboard → Products / Checkout links).
// That plan must already be a $5 USD / month recurring subscription
// (plan_type: renewal, billing_period: 30). Do not invent this ID in code.

const WHOP_ACCOUNT_ID = "biz_F6es4HVznLQC5p";

export async function POST() {
  const session = await auth();
  const userId = session?.user?.id;
  const email = session?.user?.email;

  if (!userId || !email) {
    return NextResponse.json(
      { error: "You must be signed in to start checkout." },
      { status: 401 },
    );
  }

  const apiKey = process.env.WHOP_API_KEY;
  const planId = process.env.WHOP_PLAN_ID;

  if (!apiKey || !planId) {
    return NextResponse.json(
      { error: "Checkout is not configured." },
      { status: 500 },
    );
  }

  try {
    const whop = new WhopClient({
      token: apiKey,
    });

    const checkout = await whop.checkoutConfigurations.create({
      account_id: WHOP_ACCOUNT_ID,
      plan_id: planId,
      mode: "payment",
      metadata: {
        userId,
        email,
      },
    });

    if (!checkout.purchase_url) {
      return NextResponse.json(
        { error: "Whop did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      checkoutUrl: checkout.purchase_url,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to start Whop checkout. Please try again." },
      { status: 502 },
    );
  }
}