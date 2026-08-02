import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

/** Standard hero band for interior pages. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-mesh opacity-60" />
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </Container>
    </section>
  );
}
