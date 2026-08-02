"use client";

import * as React from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { aiTools, type ToolKind } from "@/config/ai-tools";
import {
  formatCitation,
  generateOutline,
  generateQuestions,
  generateTopics,
  grammarTips,
  planTimeline,
  writingTips,
  type CitationInput,
} from "@/lib/ai-tools";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-600"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ResultList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm">
          <span>{item}</span>
          <CopyButton text={item} />
        </li>
      ))}
    </ul>
  );
}

export function AiToolsWorkspace() {
  const [active, setActive] = React.useState<ToolKind>("topic-generator");

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Tool nav */}
      <nav aria-label="AI tools" className="lg:col-span-1">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = active === tool.id;
            return (
              <li key={tool.id}>
                <button
                  id={tool.id}
                  onClick={() => setActive(tool.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive ? "bg-brand-gradient text-white shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={isActive}
                >
                  <Icon className="size-4 shrink-0" />
                  {tool.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Panel */}
      <div className="lg:col-span-3">
        <Card className="p-6 sm:p-8">
          {active === "topic-generator" && <TopicGenerator />}
          {active === "question-generator" && <QuestionGenerator />}
          {active === "citation-generator" && <CitationGenerator />}
          {active === "reference-formatter" && <ReferenceFormatter />}
          {active === "timeline-planner" && <TimelinePlanner />}
          {active === "outline-generator" && <OutlineGenerator />}
          {active === "grammar-tips" && <TipsPanel title="Grammar suggestions" tips={grammarTips} />}
          {active === "writing-tips" && <TipsPanel title="Academic writing tips" tips={writingTips} />}
        </Card>
      </div>
    </div>
  );
}

function PanelHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold">
        <Sparkles className="size-5 text-brand-500" /> {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function TopicGenerator() {
  const [field, setField] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  return (
    <div>
      <PanelHeader title="Research Topic Generator" sub="Enter your field and a keyword to spark focused, researchable topic ideas." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 block">Field of study</Label>
          <Input value={field} onChange={(e) => setField(e.target.value)} placeholder="e.g. Public Health" />
        </div>
        <div>
          <Label className="mb-1.5 block">Keyword / interest</Label>
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. maternal mortality" />
        </div>
      </div>
      <Button className="mt-4" onClick={() => setResults(generateTopics(field, keyword))}>
        Generate ideas
      </Button>
      {results.length > 0 && <ResultList items={results} />}
    </div>
  );
}

function QuestionGenerator() {
  const [topic, setTopic] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  return (
    <div>
      <PanelHeader title="Research Question Generator" sub="Turn a topic into sharp, answerable research questions." />
      <Label className="mb-1.5 block">Your topic</Label>
      <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} className="min-h-[80px]" placeholder="Paste or type your research topic…" />
      <Button className="mt-4" onClick={() => setResults(generateQuestions(topic))}>
        Generate questions
      </Button>
      {results.length > 0 && <ResultList items={results} />}
    </div>
  );
}

function CitationGenerator() {
  const [c, setC] = React.useState<CitationInput>({
    authors: "",
    year: "",
    title: "",
    source: "",
    volume: "",
    issue: "",
    pages: "",
    url: "",
    style: "APA 7th",
  });
  const [result, setResult] = React.useState("");
  const set = (k: keyof CitationInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setC((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      <PanelHeader title="Citation Generator" sub="Build a correctly formatted citation in your preferred style." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label className="mb-1.5 block">Author(s)</Label>
          <Input value={c.authors} onChange={set("authors")} placeholder="Okafor, A., & Bello, F." />
        </div>
        <div>
          <Label className="mb-1.5 block">Year</Label>
          <Input value={c.year} onChange={set("year")} placeholder="2026" />
        </div>
        <div>
          <Label className="mb-1.5 block">Style</Label>
          <Select value={c.style} onChange={set("style")}>
            {["APA 7th", "MLA", "Harvard", "Chicago", "IEEE"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1.5 block">Title</Label>
          <Input value={c.title} onChange={set("title")} placeholder="Article or book title" />
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1.5 block">Journal / Publisher</Label>
          <Input value={c.source} onChange={set("source")} placeholder="Journal of African Health" />
        </div>
        <div><Label className="mb-1.5 block">Volume</Label><Input value={c.volume} onChange={set("volume")} placeholder="12" /></div>
        <div><Label className="mb-1.5 block">Issue</Label><Input value={c.issue} onChange={set("issue")} placeholder="3" /></div>
        <div><Label className="mb-1.5 block">Pages</Label><Input value={c.pages} onChange={set("pages")} placeholder="45-58" /></div>
        <div><Label className="mb-1.5 block">URL / DOI (optional)</Label><Input value={c.url} onChange={set("url")} placeholder="https://doi.org/…" /></div>
      </div>
      <Button className="mt-4" onClick={() => setResult(formatCitation(c))}>Format citation</Button>
      {result && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{c.style}</span>
            <CopyButton text={result.replace(/\*/g, "")} />
          </div>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: result.replace(/\*(.+?)\*/g, "<em>$1</em>") }} />
        </div>
      )}
    </div>
  );
}

function ReferenceFormatter() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<string[]>([]);
  function format() {
    const lines = input
      .split("\n")
      .map((l) => l.trim().replace(/\s+/g, " "))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    setOutput(lines);
  }
  return (
    <div>
      <PanelHeader title="Reference Formatter" sub="Paste your references (one per line) to clean, de-space and alphabetise them." />
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[160px] font-mono text-xs" placeholder="Paste your reference list…" />
      <Button className="mt-4" onClick={format}>Clean & sort</Button>
      {output.length > 0 && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
          <ol className="space-y-2 text-sm">
            {output.map((line, i) => (
              <li key={i} className="border-l-2 border-brand-300 pl-3">{line}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function TimelinePlanner() {
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [plan, setPlan] = React.useState<ReturnType<typeof planTimeline>>([]);
  return (
    <div>
      <PanelHeader title="Research Timeline Planner" sub="Map research phases between your start date and deadline." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label className="mb-1.5 block">Start date</Label><Input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></div>
        <div><Label className="mb-1.5 block">Deadline</Label><Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></div>
      </div>
      <Button className="mt-4" disabled={!start || !end} onClick={() => setPlan(planTimeline(start, end))}>
        Build timeline
      </Button>
      {plan.length > 0 && (
        <ul className="mt-4 space-y-2">
          {plan.map((m) => (
            <li key={m.phase} className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-gradient text-xs font-bold text-white">{m.percent}%</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{m.phase}</p>
                <p className="text-xs text-muted-foreground">{m.start} → {m.end}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OutlineGenerator() {
  const [topic, setTopic] = React.useState("");
  const [outline, setOutline] = React.useState<ReturnType<typeof generateOutline>>([]);
  return (
    <div>
      <PanelHeader title="Proposal Outline Generator" sub="Get a solid structural outline for a research proposal to build on yourself." />
      <Label className="mb-1.5 block">Research topic</Label>
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. The impact of mobile banking on financial inclusion" />
      <Button className="mt-4" onClick={() => setOutline(generateOutline(topic))}>Generate outline</Button>
      {outline.length > 0 && (
        <div className="mt-4 space-y-4">
          {outline.map((section) => (
            <div key={section.heading} className="rounded-xl border border-border bg-muted/40 p-4">
              <h3 className="font-display font-semibold">{section.heading}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {section.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-brand-400">•</span>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TipsPanel({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div>
      <PanelHeader title={title} sub="Quick, actionable pointers to strengthen your academic writing." />
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">{i + 1}</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
