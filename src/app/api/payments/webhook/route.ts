import { NextResponse } from "next/server";

/**
 * Unified payment webhook receiver.
 *
 * Production checklist (per provider):
 *  - Paystack:    verify the `x-paystack-signature` HMAC-SHA512 header.
 *  - Flutterwave: verify the `verif-hash` header against FLW secret hash.
 *  - Stripe:      verify via stripe.webhooks.constructEvent + STRIPE_WEBHOOK_SECRET.
 *
 * On a verified `charge.success` event: mark Payment.status = SUCCEEDED,
 * set Order.status = ASSIGNED, generate the Invoice, and fire the
 * payment-receipt email. Left as a documented stub here.
 */
export async function POST(req: Request) {
  const provider = new URL(req.url).searchParams.get("provider") ?? "unknown";
  const payload = await req.text();

  // TODO: verify signature per provider before trusting the payload.
  console.log(`[webhook:${provider}] received ${payload.length} bytes`);

  return NextResponse.json({ received: true });
}
