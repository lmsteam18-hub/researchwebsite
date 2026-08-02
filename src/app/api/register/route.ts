import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { sendEmail, emailTemplates } from "@/lib/integrations/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, password, role } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        ...(role === "CLIENT" ? { wallet: { create: {} } } : {}),
      },
      select: { id: true, email: true, name: true, role: true },
    });

    // Fire a welcome email (no-ops safely if RESEND_API_KEY isn't set).
    await sendEmail({
      to: user.email,
      subject: `Welcome to Scholiva, ${name.split(" ")[0]}!`,
      html: emailTemplates.welcome(name),
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("[register]", err);
    // Demo mode fallback when the database isn't connected.
    return NextResponse.json(
      { error: "Registration is unavailable — is the database configured?" },
      { status: 503 },
    );
  }
}
