"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroIllustration } from "./hero-illustration";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-300/20 blur-[120px] dark:bg-brand-600/20" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
              <span className="eyebrow">
                <Sparkles className="size-4" />
                Trusted by 12,400+ students & researchers
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Professional{" "}
              <span className="text-gradient-animated">academic research</span> support for students worldwide
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg leading-relaxed text-muted-foreground text-balance"
            >
              Get expert guidance for research proposals, dissertations, thesis editing,
              data analysis, proofreading, formatting and publication support — from vetted
              consultants across 100+ disciplines.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Magnetic>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/order">
                    <UploadCloud className="size-5" /> Upload project
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/pricing">
                    Get instant quote <ArrowRight className="size-5" />
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                4.9/5 average rating
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-brand-500" />
                100% confidential & encrypted
              </span>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
