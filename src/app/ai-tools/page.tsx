import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { AiToolsWorkspace } from "@/components/ai-tools/ai-tools-workspace";

export const metadata: Metadata = {
  title: "Free AI Research Tools",
  description:
    "Free academic planning tools: research topic and question generators, citation and reference formatters, timeline planner, proposal outline generator, and writing tips.",
};

export default function AiToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free productivity tools"
        title={<>AI-assisted <span className="text-gradient">research tools</span></>}
        description="Free planning and productivity aids to organise your own research — from first idea to reference list."
      />
      <Container className="pb-24">
        <div className="mx-auto mb-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-200/60 bg-brand-50/60 p-4 text-sm text-brand-800 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200">
          <Info className="mt-0.5 size-5 shrink-0" />
          <p>
            These tools help you <strong>plan and structure your own work</strong>. They
            provide scaffolding, ideas and formatting — not finished assignments for
            submission. Using them supports genuine learning and upholds academic integrity.
          </p>
        </div>
        <AiToolsWorkspace />
      </Container>
    </>
  );
}
