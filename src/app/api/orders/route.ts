import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations";
import { computeQuote } from "@/lib/pricing";
import { initPayment, type InitPaymentArgs } from "@/lib/integrations/payments";
import { sendEmail, emailTemplates } from "@/lib/integrations/email";
import { formatCurrency, orderReference } from "@/lib/utils";
import { deadlineOptions } from "@/config/pricing";

/**
 * Create an order: persists the client, order, invoice and a pending payment,
 * then initialises checkout and fires the confirmation email.
 *
 * References/invoice numbers are generated with a retry loop so two
 * simultaneous orders can never collide (and a real failure is surfaced,
 * never silently swallowed).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid order", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Recompute the quote server-side — never trust a client-sent total.
    const quote = computeQuote({
      serviceSlug: data.service,
      levelId: data.academicLevel,
      deadlineId: data.deadline,
      subject: data.subject || undefined,
      pages: data.pages,
      addons: {
        plagiarismReport: data.plagiarismReport,
        premiumConsultant: data.premiumConsultant,
      },
    });

    const paymentProvider = (body.paymentMethod ?? "paystack") as InitPaymentArgs["provider"];
    // Uploaded file metadata from /api/uploads (real storage paths). Falls back
    // to bare filenames for backward compatibility.
    type IncomingAttachment = { filename: string; path?: string; sizeBytes?: number; mimeType?: string };
    const attachments: IncomingAttachment[] = Array.isArray(body.attachments)
      ? body.attachments
      : Array.isArray(body.files)
        ? body.files.map((name: string) => ({ filename: name }))
        : [];

    let reference: string | undefined;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Transient Supabase pooler errors (P1001/P1017/P1000) are retried a few
    // times with backoff; the inner loop handles reference collisions (P2002).
    for (let connectTry = 0; connectTry < 3 && !reference; connectTry++) {
      try {
      const session = await getServerSession(authOptions);

      const service = await prisma.service.upsert({
        where: { slug: data.service },
        update: {},
        create: { slug: data.service, title: data.service, category: "Writing & Structure", description: "" },
      });

      const client = session?.user?.id
        ? await prisma.user.findUnique({ where: { id: session.user.id } })
        : await prisma.user.upsert({
            where: { email: data.email },
            update: { name: data.name, phone: data.phone, country: data.country },
            create: {
              email: data.email,
              name: data.name,
              phone: data.phone,
              country: data.country,
              institution: data.institution || null,
              role: "CLIENT",
            },
          });
      if (!client) {
        return NextResponse.json({ error: "Could not resolve your account." }, { status: 400 });
      }

      const deadline = deadlineOptions.find((d) => d.id === data.deadline);
      const dueAt = deadline ? new Date(Date.now() + deadline.hours * 3600 * 1000) : null;
      const year = new Date().getFullYear();
      const baseSeq = (await prisma.order.count()) + 1;

      // Retry with a fresh (and, after the first attempt, randomised) reference
      // until we get one that doesn't collide with a concurrent order.
      const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase();
      let created = false;
      for (let attempt = 0; attempt < 6 && !created; attempt++) {
        const seq = baseSeq + attempt;
        const ref = attempt === 0 ? orderReference(seq) : `${orderReference(seq)}-${rand()}`;
        const invoiceNumber =
          attempt === 0
            ? `INV-${year}-${String(seq).padStart(4, "0")}`
            : `INV-${year}-${String(seq).padStart(4, "0")}-${rand()}`;
        try {
          await prisma.order.create({
            data: {
              reference: ref,
              clientId: client.id,
              serviceId: service.id,
              subject: data.subject || null,
              academicLevel: data.academicLevel,
              deadlineId: data.deadline,
              dueAt,
              pages: data.pages,
              wordCount: data.wordCount ?? null,
              referenceStyle: data.referenceStyle ?? null,
              instructions: data.instructions,
              additionalNotes: data.additionalNotes || null,
              amountNgn: quote.total,
              files: {
                create: attachments.map((a) => ({
                  filename: a.filename,
                  url: a.path ?? `pending://${a.filename}`,
                  sizeBytes: a.sizeBytes ?? 0,
                  mimeType: a.mimeType ?? "application/octet-stream",
                  uploadedById: client.id,
                })),
              },
              invoice: { create: { number: invoiceNumber, amount: quote.total, dueAt } },
              payment: {
                create: {
                  provider:
                    paymentProvider === "bank"
                      ? "BANK_TRANSFER"
                      : (paymentProvider.toUpperCase() as "PAYSTACK" | "FLUTTERWAVE" | "STRIPE"),
                  amount: quote.total,
                },
              },
            },
          });
          reference = ref;
          created = true;
        } catch (e) {
          // P2002 = unique constraint violation (reference/invoice collision) → retry.
          if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
          throw e;
        }
      }
      if (!created) {
        return NextResponse.json(
          { error: "Could not generate a unique order reference. Please try again." },
          { status: 409 },
        );
      }
      } catch (dbErr) {
        const code =
          dbErr instanceof Prisma.PrismaClientKnownRequestError ? dbErr.code : "";
        const transient = code === "P1001" || code === "P1017" || code === "P1000";
        if (transient && connectTry < 2) {
          await sleep(400 * (connectTry + 1));
          continue; // retry the whole persistence on a transient pooler blip
        }
        console.error("[orders] persistence failed:", dbErr);
        return NextResponse.json(
          { error: "We couldn't save your order. Please try again in a moment." },
          { status: 503 },
        );
      }
    }

    if (!reference) {
      return NextResponse.json(
        { error: "We couldn't save your order. Please try again in a moment." },
        { status: 503 },
      );
    }

    const payment = await initPayment({
      provider: paymentProvider,
      email: data.email,
      amountNgn: quote.total,
      reference: reference!,
    });

    await sendEmail({
      to: data.email,
      subject: `Order ${reference!} confirmed`,
      html: emailTemplates.orderConfirmation(data.name, reference!, formatCurrency(quote.total, "NGN")),
    });

    return NextResponse.json({
      reference,
      total: quote.total,
      breakdown: quote.breakdown,
      payment,
    });
  } catch (err) {
    console.error("[orders]", err);
    return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  }
}
