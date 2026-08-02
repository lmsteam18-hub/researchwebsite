import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" />
      <Container className="text-center">
        <p className="font-display text-8xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link href="/"><Home className="size-4" /> Back home</Link></Button>
          <Button asChild variant="outline"><Link href="/services"><Search className="size-4" /> Browse services</Link></Button>
        </div>
      </Container>
    </section>
  );
}
