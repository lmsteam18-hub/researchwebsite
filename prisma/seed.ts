/**
 * Seed script — populates services, a demo admin/consultant/client,
 * a sample order, coupons and blog posts.
 * Run with: npm run db:seed
 */
import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Import domain data (kept in sync with the marketing site).
import { services as serviceData } from "../src/config/services";
import { blogPosts } from "../src/config/content";

async function main() {
  console.log("🌱 Seeding Scholiva…");

  // Services
  for (const s of serviceData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        title: s.title,
        category: s.category,
        description: s.description,
        priceFactor: s.priceFactor,
        perPage: s.perPage,
      },
    });
  }
  console.log(`  ✓ ${serviceData.length} services`);

  const password = await bcrypt.hash("Password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@scholiva.com" },
    update: {},
    create: { email: "admin@scholiva.com", name: "Scholiva Admin", role: Role.ADMIN, passwordHash: password },
  });

  const consultant = await prisma.user.upsert({
    where: { email: "consultant@scholiva.com" },
    update: {},
    create: {
      email: "consultant@scholiva.com",
      name: "Dr. Amina Okonkwo",
      role: Role.CONSULTANT,
      passwordHash: password,
      consultantProfile: {
        create: {
          headline: "Public Health & Biostatistics Consultant",
          bio: "10+ years supporting postgraduate research in public health and epidemiology.",
          disciplines: ["Public Health", "Statistics", "Nursing"],
          qualifications: "PhD Public Health, MSc Biostatistics",
          rating: 4.9,
          completedJobs: 214,
          isVetted: true,
        },
      },
    },
  });

  const client = await prisma.user.upsert({
    where: { email: "client@scholiva.com" },
    update: {},
    create: {
      email: "client@scholiva.com",
      name: "Daniel Mensah",
      role: Role.CLIENT,
      passwordHash: password,
      country: "United Kingdom",
      institution: "University of Manchester",
      wallet: { create: { balanceNgn: 0 } },
    },
  });

  const spss = await prisma.service.findUnique({ where: { slug: "spss-analysis" } });
  if (spss) {
    await prisma.order.upsert({
      where: { reference: "SCH-000001" },
      update: {},
      create: {
        reference: "SCH-000001",
        status: OrderStatus.IN_PROGRESS,
        progress: 45,
        clientId: client.id,
        consultantId: consultant.id,
        serviceId: spss.id,
        subject: "Public Health",
        academicLevel: "masters",
        deadlineId: "7d",
        pages: 12,
        instructions: "Run descriptive + inferential stats on my survey dataset and interpret.",
        amountNgn: 84000,
        messages: {
          create: [
            { senderId: client.id, body: "Hi, I've uploaded my dataset and questionnaire." },
            { senderId: consultant.id, body: "Received — I'll start with the descriptives and share drafts soon." },
          ],
        },
      },
    });
  }

  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: { code: "WELCOME10", description: "10% off your first order", percentOff: 10 },
  });

  for (const p of blogPosts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.excerpt,
        category: p.category,
        published: true,
        authorId: admin.id,
        publishedAt: new Date(p.date),
      },
    });
  }
  console.log(`  ✓ users, sample order, coupon, ${blogPosts.length} posts`);
  console.log("✅ Seed complete. Demo logins (password: Password123):");
  console.log("   admin@scholiva.com · consultant@scholiva.com · client@scholiva.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
