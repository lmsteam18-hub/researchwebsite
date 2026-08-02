import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, GraduationCap, ListChecks, Quote, Table2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Research Resource Library",
  description:
    "Free downloadable templates and guides — proposal templates, dissertation checklists, APA reference guides, questionnaire samples and more.",
};

const resources = [
  { icon: FileText, title: "Research Proposal Template", type: "DOCX", desc: "A structured proposal template with prompts for each section." },
  { icon: GraduationCap, title: "Dissertation Checklist", type: "PDF", desc: "A chapter-by-chapter checklist to keep you on track." },
  { icon: Quote, title: "APA 7th Quick Reference", type: "PDF", desc: "In-text and reference-list examples at a glance." },
  { icon: ListChecks, title: "Questionnaire Design Guide", type: "PDF", desc: "Build valid, reliable survey instruments." },
  { icon: Table2, title: "SPSS Output Interpretation Sheet", type: "PDF", desc: "Read and report common SPSS tables correctly." },
  { icon: FileText, title: "Literature Matrix Template", type: "XLSX", desc: "Organise and synthesise your sources efficiently." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free resource library"
        title={<>Templates & guides to <span className="text-gradient">work smarter</span></>}
        description="Download free, ready-to-use templates and reference guides to support your own research."
      />
      <Container className="pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.title} className="flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <Badge variant="muted">{r.type}</Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{r.desc}</p>
                <Button variant="outline" size="sm" className="mt-4 w-fit">
                  <Download className="size-4" /> Download
                </Button>
              </Card>
            );
          })}
        </div>

        <Card glass className="mt-12 flex flex-col items-center gap-3 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-lg font-bold">Need something tailored?</h3>
            <p className="text-sm text-muted-foreground">Our consultants can build custom templates for your project.</p>
          </div>
          <Button asChild><Link href="/order">Request custom support</Link></Button>
        </Card>
      </Container>
    </>
  );
}
