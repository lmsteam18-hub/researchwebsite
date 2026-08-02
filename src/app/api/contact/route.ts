import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/integrations/email";
import { siteConfig } from "@/config/site";

export async function POST(req: Request) {
  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;

  await sendEmail({
    to: siteConfig.contact.supportEmail,
    subject: `[Contact] ${subject}`,
    html: `<p><strong>${name}</strong> (${email}) wrote:</p><p>${message}</p>`,
  });

  return NextResponse.json({ ok: true });
}
