import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/config/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research Resources & Blog",
  description:
    "Guides, tutorials and tips on thesis writing, APA referencing, research methodology, SPSS, dissertations, journal publication and research ethics.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={<>The <span className="text-gradient">research library</span></>}
        description="Practical guides and tutorials to help you write, analyse and publish with confidence."
      />

      <Container className="pb-24">
        {/* Featured */}
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className={`group grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft card-hover lg:grid-cols-2`}
          >
            <div className={`relative min-h-[220px] bg-gradient-to-br ${featured.cover} p-8`}>
              <div className="absolute inset-0 bg-mesh opacity-30" />
              <Badge className="relative border-white/30 bg-white/15 text-white">{featured.category}</Badge>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatDate(featured.date)}</span>
                <span className="flex items-center gap-1"><Clock className="size-3.5" /> {featured.readingTime}</span>
              </div>
              <h2 className="mt-3 flex items-start gap-1 font-display text-2xl font-bold">
                {featured.title}
                <ArrowUpRight className="size-5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-4 text-sm font-medium">By {featured.author}</p>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i % 3}>
              <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft card-hover">
                <div className={`relative h-36 bg-gradient-to-br ${post.cover}`}>
                  <div className="absolute inset-0 bg-mesh opacity-30" />
                  <Badge className="absolute left-4 top-4 border-white/30 bg-white/15 text-white">{post.category}</Badge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readingTime}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
