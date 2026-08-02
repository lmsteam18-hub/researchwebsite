import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const parsed = newsletterSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
  } catch {
    // Demo mode — accept the subscription without persistence.
  }
  return NextResponse.json({ ok: true });
}
