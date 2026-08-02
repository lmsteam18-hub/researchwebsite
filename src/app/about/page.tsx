import type { Metadata } from "next";
import Link from "next/link";
import { Award, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scholiva is a mission-driven academic research support platform connecting students and researchers across Africa and the diaspora with vetted consultants.",
};

const values = [
  { icon: ShieldCheck, title: "Integrity first", desc: "We support learning, never shortcuts. Our academic-integrity policy is non-negotiable." },
  { icon: Award, title: "Vetted expertise", desc: "Every consultant is screened for qualifications, experience and subject depth." },
  { icon: HeartHandshake, title: "Student-centred", desc: "Transparent pricing, free revisions and real human support at every step." },
  { icon: Target, title: "Outcomes that matter", desc: "We measure success by your approvals, grades and publications." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={<>Empowering research <span className="text-gradient">across Africa & beyond</span></>}
        description="We started Scholiva because too many capable students were held back not by ability, but by a lack of expert guidance. We're here to change that."
      />

      <Container className="pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <h2 className="font-display text-2xl font-bold">Our mission</h2>
            <p className="text-muted-foreground">
              {siteConfig.name} exists to democratise access to world-class academic
              research support. Whether you&apos;re an undergraduate in Lagos, a master&apos;s
              student in Manchester, or a lecturer preparing a journal submission, you deserve
              guidance from someone who truly understands your field.
            </p>
            <p className="text-muted-foreground">
              We connect you with vetted consultants across 100+ disciplines and give you the
              tools — transparent pricing, secure collaboration and live progress tracking — to
              move your research forward with confidence and integrity.
            </p>
          </div>
          <Card glass className="grid grid-cols-2 gap-6 p-8">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-gradient">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </Card>
        </div>

        <section className="mt-20">
          <h2 className="text-center font-display text-3xl font-bold">What we stand for</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <Card glass className="mt-20 flex flex-col items-center gap-4 p-10 text-center">
          <Users className="size-10 text-brand-500" />
          <h2 className="font-display text-2xl font-bold">Become a consultant</h2>
          <p className="max-w-xl text-muted-foreground">
            Are you a subject-matter expert with a postgraduate qualification? Join our vetted
            network, work flexibly, and help the next generation of researchers succeed.
          </p>
          <Button asChild size="lg">
            <Link href="/register?role=consultant">Apply to join</Link>
          </Button>
        </Card>
      </Container>
    </>
  );
}
