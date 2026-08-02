import Link from "next/link";
import { ArrowRight, CalendarCheck, UploadCloud } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-16 text-center text-white shadow-glass-lg sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-30" />
            <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Ready to move your research forward?
              </h2>
              <p className="mt-4 text-lg text-white/85 text-balance">
                Upload your project for a free, no-obligation quote, or book a consultation
                with a specialist in your discipline today.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="glass" className="text-brand-700">
                  <Link href="/order">
                    <UploadCloud className="size-5" /> Upload project
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href="/consultation">
                    <CalendarCheck className="size-5" /> Book consultation
                    <ArrowRight className="size-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
