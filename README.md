# Scholiva

**Professional academic research support for students, researchers and professionals across Africa & the diaspora.**

Scholiva is an enterprise-grade platform — think *Fiverr + Upwork + Grammarly + Scribbr*, purpose-built for academic research support. It connects clients with vetted consultants for research proposals, dissertations, data analysis, editing, formatting and publication support.

> Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Prisma + PostgreSQL, NextAuth, Stripe / Paystack / Flutterwave, Resend, Cloudinary and AWS S3.

---

## ✨ Features

**Marketing site**
- Apple-quality UI: clean white canvas, purple→blue gradients, glassmorphism, smooth Framer Motion, full **dark mode**, mobile-first, WCAG-minded (skip links, focus rings, reduced-motion support).
- Animated hero, 20+ services, 100+ subjects, how-it-works, testimonials, security, FAQ.
- **Instant pricing calculator** (service × level × deadline × pages × subject complexity × urgency + add-ons) with **multi-currency** display.
- **Free AI productivity tools** — topic & question generators, citation generator, reference formatter, timeline planner, proposal outline generator, grammar & writing tips. *Framed as planning aids, not assignment writers.*
- SEO blog/resource library, legal pages, sitemap, robots, JSON-LD structured data, dynamic OG image.

**Application**
- Multi-step **order form** (React Hook Form + Zod) with drag-and-drop uploads (15+ file types, up to 500MB) and a live quote sidebar.
- **Client dashboard** — orders, 7-stage tracking timeline, progress %, messaging, invoices, wallet.
- **Consultant dashboard** — assigned jobs, milestones, earnings/withdrawals, ratings.
- **Admin dashboard** — revenue analytics, orders, clients, consultants, support tickets, coupons, referrals, CMS/SEO nav.
- Auth (NextAuth: credentials + Google), role-based (CLIENT / CONSULTANT / ADMIN).
- Payment initialisation for Paystack, Flutterwave, Stripe (+ bank transfer); email automation via Resend.

---

## 🚀 Getting started

### Prerequisites
- **Node.js 18.18+** (20 LTS recommended) and npm
- A **PostgreSQL** database (local, or Neon/Supabase/Railway)

### 1. Install
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Fill in `DATABASE_URL` and `NEXTAUTH_SECRET` at minimum (generate one with `openssl rand -base64 32`). Payment/email/storage keys are optional — the app runs in **demo mode** without them.

### 3. Set up the database
```bash
npm run db:generate   # generate Prisma client
npm run db:push       # push schema to your database
npm run db:seed       # seed services, demo users, sample order, blog posts
```

Demo logins (password `Password123`):
- `admin@scholiva.com` · `consultant@scholiva.com` · `client@scholiva.com`

### 4. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project structure

```
src/
├─ app/                    # App Router routes
│  ├─ (marketing)          # home, services, pricing, about, contact, blog, ai-tools, legal…
│  ├─ order/               # multi-step order + quote
│  ├─ dashboard/           # client workspace
│  ├─ consultant/          # consultant workspace
│  ├─ admin/               # admin analytics
│  ├─ login, register…     # auth
│  ├─ api/                 # orders, register, contact, newsletter, uploads/presign, payments/webhook, auth
│  ├─ sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon.svg
├─ components/             # ui primitives, layout, home sections, dashboard, order, ai-tools…
├─ config/                 # site, services, subjects, pricing, content, ai-tools, legal, demo
├─ lib/                    # utils, pricing engine, validations (Zod), seo, auth, prisma, store, ai-tools, integrations/
└─ types/                  # next-auth type augmentation
prisma/                    # schema.prisma + seed.ts
```

### Rebranding
Everything brand-related lives in [`src/config/site.ts`](src/config/site.ts) — change the name, tagline, contact details and socials in one place.

---

## 🔌 Integrations (add keys to go live)

| Capability | Provider | Env vars | Notes |
|---|---|---|---|
| Auth | NextAuth | `NEXTAUTH_SECRET`, `GOOGLE_*` | Credentials + optional Google |
| Payments | Paystack / Flutterwave / Stripe | `*_SECRET_KEY`, public keys | `src/lib/integrations/payments.ts` |
| Email | Resend | `RESEND_API_KEY`, `EMAIL_FROM` | Templates in `src/lib/integrations/email.ts` |
| Small files/images | Cloudinary | `CLOUDINARY_*` | Signed uploads |
| Large files (≤500MB) | AWS S3 | `AWS_*` | Presigned PUT URLs |

Payment webhooks: implement signature verification per provider in [`src/app/api/payments/webhook/route.ts`](src/app/api/payments/webhook/route.ts).

---

## 🛡️ Security & compliance
SSL/TLS, encrypted uploads, GDPR/NDPR posture, role-based access, optional 2FA (schema-ready), PCI-DSS-compliant payment processors (card data never touches our servers), security headers in `next.config.mjs`.

---

## 📌 Status / roadmap
- Dashboards currently render rich **demo data**; wire them to Prisma queries + `getServerSession` and protect via middleware for production.
- Real-time chat is scaffolded (schema + UI) — connect Pusher/Ably or Postgres LISTEN/NOTIFY.
- Add Playwright/Vitest, CI, and Vercel deployment.

## 📄 License
Proprietary — © Scholiva. All rights reserved.
