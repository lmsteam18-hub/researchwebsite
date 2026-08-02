"use client";

import * as React from "react";
import { CalendarCheck, CheckCircle2, Clock, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

// Static, deterministic slate of upcoming days (avoids hydration mismatch).
const days = [
  { date: "2026-07-16", label: "Thu 16" },
  { date: "2026-07-17", label: "Fri 17" },
  { date: "2026-07-18", label: "Sat 18" },
  { date: "2026-07-20", label: "Mon 20" },
  { date: "2026-07-21", label: "Tue 21" },
];

export default function ConsultationPage() {
  const [day, setDay] = React.useState(days[0].date);
  const [slot, setSlot] = React.useState<string | null>(null);
  const [booked, setBooked] = React.useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Book a consultation"
        title={<>Talk to a <span className="text-gradient">research specialist</span></>}
        description="Schedule a live video session to unblock any stage of your research — 45 minutes, one-on-one."
      />

      <Container className="pb-24">
        {booked ? (
          <Card glass className="mx-auto max-w-lg p-10 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold">Consultation booked!</h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;ve reserved {day} at {slot}. A calendar invite and video link are on their way to your inbox.
            </p>
            <Button className="mt-6" onClick={() => setBooked(false)}>Book another</Button>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">Choose a date & time</h2>

              <Label className="mb-2 mt-6 block">Date</Label>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setDay(d.date)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                      day === d.date ? "border-transparent bg-brand-gradient text-white shadow-soft" : "border-border hover:border-brand-300",
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <Label className="mb-2 mt-6 block">Available times (WAT)</Label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "rounded-xl border py-2.5 text-sm font-medium transition-all",
                      slot === s ? "border-transparent bg-brand-gradient text-white shadow-soft" : "border-border hover:border-brand-300",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div><Label className="mb-1.5 block">Your name</Label><Input placeholder="Ada Lovelace" /></div>
                <div><Label className="mb-1.5 block">Email</Label><Input type="email" placeholder="you@university.edu" /></div>
              </div>

              <Button className="mt-6" size="lg" disabled={!slot} onClick={() => setBooked(true)}>
                <CalendarCheck className="size-5" /> Confirm booking
              </Button>
            </Card>

            <Card glass className="h-fit p-6">
              <h3 className="font-display text-lg font-bold">What&apos;s included</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Video className="size-4 text-brand-500" /> 45-min live video session</li>
                <li className="flex items-center gap-2"><Clock className="size-4 text-brand-500" /> Flexible rescheduling</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-brand-500" /> Session notes & next steps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-brand-500" /> Matched to your discipline</li>
              </ul>
              <p className="mt-6 font-display text-2xl font-bold text-gradient">₦25,000</p>
              <p className="text-xs text-muted-foreground">per session · credited if you order</p>
            </Card>
          </div>
        )}
      </Container>
    </>
  );
}
