import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/config/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article>
      <div className={`relative pt-32 pb-16 bg-gradient-to-br ${post.cover}`}>
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <Container className="relative max-w-3xl text-white">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <Badge className="mt-4 border-white/30 bg-white/15 text-white">{post.category}</Badge>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/85">
            <span>By {post.author}</span>
            <span className="flex items-center gap-1"><CalendarDays className="size-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock className="size-4" /> {post.readingTime}</span>
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-display prose-a:text-brand-600">
          <p className="lead text-lg text-muted-foreground">{post.excerpt}</p>
          <p>
            This article is part of the {post.category} series in the Scholiva research
            library. It offers practical, experience-based guidance you can apply directly to
            your own work. (This is placeholder content — connect your CMS or Markdown source
            to render full articles here.)
          </p>
          <h2>Why this matters</h2>
          <p>
            Strong research habits compound over time. The tips below are drawn from the
            consultants who guide thousands of projects every year on {post.category.toLowerCase()}.
          </p>
          <ul>
            <li>Start early and break the work into weekly milestones.</li>
            <li>Keep a running reference list from day one.</li>
            <li>Write a little every day rather than in rare marathons.</li>
            <li>Get feedback on structure before polishing prose.</li>
          </ul>
          <h2>Next steps</h2>
          <p>
            Need a hand applying this to your own project? Our consultants can review your
            draft, run your analysis, or coach you through your methodology.
          </p>
        </div>

        <Card glass className="mt-10 flex flex-col items-center gap-3 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-lg font-bold">Put this into practice</h3>
            <p className="text-sm text-muted-foreground">Get expert support on your project today.</p>
          </div>
          <Button asChild><Link href="/order">Start a project</Link></Button>
        </Card>
      </Container>

      <Container className="max-w-5xl pb-24">
        <h2 className="font-display text-2xl font-bold">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft card-hover">
              <div className={`h-28 bg-gradient-to-br ${r.cover}`} />
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{r.category}</p>
                <h3 className="mt-1 font-display font-semibold leading-snug">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </article>
  );
}
