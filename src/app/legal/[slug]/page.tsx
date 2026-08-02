import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { legalDocs, getLegalDoc } from "@/config/legal";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Not found" };
  return { title: doc.title, description: doc.intro, alternates: { canonical: `/legal/${doc.slug}` } };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} description={doc.intro} />
      <Container className="max-w-3xl pb-24">
        <p className="mb-8 text-sm text-muted-foreground">Last updated {formatDate(doc.updated)}</p>
        <div className="space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-bold">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
