/**
 * Unified payment initialisation across Paystack, Flutterwave and Stripe.
 * Each returns an authorization/checkout URL to redirect the client to.
 * All functions guard on missing keys so the app runs in demo mode.
 */
import Stripe from "stripe";
import { siteConfig } from "@/config/site";

export interface InitPaymentArgs {
  provider: "paystack" | "flutterwave" | "stripe" | "bank";
  email: string;
  amountNgn: number;
  reference: string;
  currency?: string;
  callbackUrl?: string;
}

export interface InitPaymentResult {
  url?: string;
  reference: string;
  demo?: boolean;
  message?: string;
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

export async function initPayment(args: InitPaymentArgs): Promise<InitPaymentResult> {
  const callback = args.callbackUrl ?? `${siteConfig.url}/dashboard/orders?ref=${args.reference}`;

  switch (args.provider) {
    case "paystack":
      return initPaystack(args, callback);
    case "flutterwave":
      return initFlutterwave(args, callback);
    case "stripe":
      return initStripe(args, callback);
    case "bank":
      return { reference: args.reference, message: "Bank transfer instructions emailed." };
  }
}

async function initPaystack(args: InitPaymentArgs, callback: string): Promise<InitPaymentResult> {
  if (!process.env.PAYSTACK_SECRET_KEY) return demo(args.reference);
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: args.email,
      amount: args.amountNgn * 100, // kobo
      reference: args.reference,
      callback_url: callback,
    }),
  });
  const json = await res.json();
  return { url: json?.data?.authorization_url, reference: args.reference };
}

async function initFlutterwave(args: InitPaymentArgs, callback: string): Promise<InitPaymentResult> {
  if (!process.env.FLUTTERWAVE_SECRET_KEY) return demo(args.reference);
  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: args.reference,
      amount: args.amountNgn,
      currency: args.currency ?? "NGN",
      redirect_url: callback,
      customer: { email: args.email },
    }),
  });
  const json = await res.json();
  return { url: json?.data?.link, reference: args.reference };
}

async function initStripe(args: InitPaymentArgs, callback: string): Promise<InitPaymentResult> {
  if (!stripe) return demo(args.reference);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: (args.currency ?? "usd").toLowerCase(),
          product_data: { name: `Scholiva order ${args.reference}` },
          unit_amount: Math.round(args.amountNgn * 0.00065 * 100), // NGN→USD cents (demo rate)
        },
        quantity: 1,
      },
    ],
    success_url: `${callback}&status=success`,
    cancel_url: `${callback}&status=cancelled`,
    customer_email: args.email,
    client_reference_id: args.reference,
  });
  return { url: session.url ?? undefined, reference: args.reference };
}

function demo(reference: string): InitPaymentResult {
  return {
    reference,
    demo: true,
    message: "Payment provider keys not configured — running in demo mode.",
  };
}
