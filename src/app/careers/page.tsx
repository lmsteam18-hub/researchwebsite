import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Globe2, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Scholiva — become a vetted academic consultant or join our team. Flexible, remote, mission-driven work.",
};

const roles = [
  { title: "Academic Consultant — Data Analysis", type: "Contract · Remote", tags: ["SPSS", "R", "Python"] },
  { title: "Academic Editor & Proofreader", type: "Contract · Remote", tags: ["Editing", "APA/MLA"] },
  { title: "Research Consultant — Health Sciences", type: "Contract · Remote", tags: ["Public Health", "Nursing"] },
  { title: "Content & SEO Writer", type: "Part-time · Remote", tags: ["Blog", "SEO"] },
];

const perks = [
  { icon: Globe2, title: "Work from anywhere", desc: "Fully remote across Africa and the diaspora." },
  { icon: Briefcase, title: "Flexible workload", desc: "Accept the projects that fit your schedule." },
  { icon: HeartHandshake, title: "Meaningful impact", desc: "Help students and researchers succeed." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={<>Build your career while <span className="text-gradient">building others&apos;</span></>}
        description="Join our vetted network of consultants and our growing team."
      />
      <Container className="pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300"><Icon className="size-5" /></span>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </Card>
            );
          })}
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold">Open roles</h2>
        <div className="mt-6 space-y-3">
          {roles.map((r) => (
            <Card key={r.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.type}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => <Badge key={t} variant="soft">{t}</Badge>)}
                </div>
              </div>
              <Button asChild variant="outline"><Link href="/register?role=consultant">Apply <ArrowRight className="size-4" /></Link></Button>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
