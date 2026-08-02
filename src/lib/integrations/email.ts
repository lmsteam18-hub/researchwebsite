import { Resend } from "resend";
import { siteConfig } from "@/config/site";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? `${siteConfig.name} <noreply@example.com>`;

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

/** Send a transactional email. No-ops with a warning if Resend isn't configured. */
export async function sendEmail({ to, subject, html }: SendArgs) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY missing — skipping "${subject}" to ${to}`);
    return { skipped: true };
  }
  return resend.emails.send({ from: FROM, to, subject, html });
}

// ── Templates (used by the email-automation flows) ──

const shell = (title: string, body: string) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <div style="background:linear-gradient(135deg,#7c4dff,#3366ff);border-radius:16px;padding:24px;color:#fff">
      <h1 style="margin:0;font-size:20px">${siteConfig.name}</h1>
    </div>
    <div style="padding:24px 4px">
      <h2 style="font-size:18px;color:#18181b">${title}</h2>
      ${body}
      <p style="margin-top:24px;color:#71717a;font-size:12px">
        ${siteConfig.legalName} · ${siteConfig.contact.address}
      </p>
    </div>
  </div>`;

export const emailTemplates = {
  welcome: (name: string) =>
    shell("Welcome to Scholiva 🎓", `
      <p>Hi ${name},</p>
      <p>Welcome to ${siteConfig.name}! Your account is ready. You can now upload projects,
      get instant quotes, and collaborate with vetted academic consultants.</p>
      <p><a href="${siteConfig.url}/dashboard" style="color:#6d28f7">Go to your dashboard →</a></p>`),

  orderConfirmation: (name: string, reference: string, amount: string) =>
    shell("Order confirmed", `
      <p>Hi ${name},</p>
      <p>Thanks for your order <strong>${reference}</strong>. We've received your project and are matching you with a specialist.</p>
      <p>Estimated total: <strong>${amount}</strong>.</p>`),

  paymentReceipt: (name: string, reference: string, amount: string) =>
    shell("Payment receipt", `
      <p>Hi ${name},</p>
      <p>We've received your payment of <strong>${amount}</strong> for order <strong>${reference}</strong>. Your invoice is attached in your dashboard.</p>`),

  statusUpdate: (name: string, reference: string, status: string) =>
    shell("Order update", `
      <p>Hi ${name},</p>
      <p>Your order <strong>${reference}</strong> is now <strong>${status}</strong>.</p>`),

  deliveryNotification: (name: string, reference: string) =>
    shell("Your project is ready", `
      <p>Hi ${name},</p>
      <p>Great news — your deliverables for order <strong>${reference}</strong> are ready to download from your dashboard.</p>`),

  reviewRequest: (name: string, reference: string) =>
    shell("How did we do?", `
      <p>Hi ${name},</p>
      <p>We'd love your feedback on order <strong>${reference}</strong>. Your review helps other students and our consultants.</p>`),
};
