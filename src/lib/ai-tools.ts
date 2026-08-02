/**
 * Deterministic, client-side helpers powering the free research tools.
 * These are planning/productivity aids — templated scaffolds the student
 * completes themselves. No content is generated for direct submission.
 */

const APPROACHES = [
  "An assessment of",
  "The impact of",
  "A comparative analysis of",
  "Factors influencing",
  "The role of",
  "An evaluation of",
  "Determinants of",
  "The relationship between",
];

const LENSES = [
  "in the context of {field}",
  "among undergraduate students",
  "in developing economies",
  "in Sub-Saharan Africa",
  "during the post-pandemic era",
  "and its policy implications",
  "using a mixed-methods approach",
  "from a stakeholder perspective",
];

export function generateTopics(field: string, keyword: string): string[] {
  const f = field || "your field";
  const k = keyword || "the subject";
  return APPROACHES.slice(0, 6).map((a, i) => {
    const lens = LENSES[i % LENSES.length].replace("{field}", f);
    return `${a} ${k} ${lens}.`;
  });
}

export function generateQuestions(topic: string): string[] {
  const t = topic.trim().replace(/\.$/, "") || "your topic";
  return [
    `What is the current state of knowledge regarding ${t}?`,
    `What factors most strongly influence ${t}?`,
    `How does ${t} vary across different contexts or groups?`,
    `What is the relationship between the key variables in ${t}?`,
    `What are the practical or policy implications of findings on ${t}?`,
  ];
}

export interface CitationInput {
  authors: string; // "Okafor, A., & Bello, F."
  year: string;
  title: string;
  source: string; // journal / publisher
  volume?: string;
  issue?: string;
  pages?: string;
  url?: string;
  style: "APA 7th" | "MLA" | "Harvard" | "Chicago" | "IEEE";
}

export function formatCitation(c: CitationInput): string {
  const authors = c.authors.trim();
  const year = c.year.trim();
  const title = c.title.trim();
  const source = c.source.trim();
  const vi = c.volume ? `${c.volume}${c.issue ? `(${c.issue})` : ""}` : "";
  const pages = c.pages ? `${c.pages}` : "";
  const url = c.url ? ` ${c.url}` : "";

  switch (c.style) {
    case "APA 7th":
      return `${authors} (${year}). ${title}. *${source}*${vi ? `, ${vi}` : ""}${pages ? `, ${pages}` : ""}.${url}`;
    case "MLA":
      return `${authors}. "${title}." *${source}*${vi ? `, vol. ${vi}` : ""}, ${year}${pages ? `, pp. ${pages}` : ""}.${url}`;
    case "Harvard":
      return `${authors} (${year}) '${title}', *${source}*${vi ? `, ${vi}` : ""}${pages ? `, pp. ${pages}` : ""}.${url}`;
    case "Chicago":
      return `${authors}. "${title}." *${source}* ${vi}${pages ? ` (${year}): ${pages}` : ` (${year})`}.${url}`;
    case "IEEE":
      return `${authors}, "${title}," *${source}*${vi ? `, vol. ${vi}` : ""}${pages ? `, pp. ${pages}` : ""}, ${year}.${url}`;
    default:
      return `${authors} (${year}). ${title}. ${source}.`;
  }
}

export interface Milestone {
  phase: string;
  start: string;
  end: string;
  percent: number;
}

/** Split the window between now and the deadline into weighted research phases. */
export function planTimeline(startISO: string, endISO: string): Milestone[] {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const total = Math.max(1, end.getTime() - start.getTime());

  const phases = [
    { phase: "Topic & proposal", weight: 0.12 },
    { phase: "Literature review", weight: 0.22 },
    { phase: "Methodology & instruments", weight: 0.12 },
    { phase: "Data collection", weight: 0.18 },
    { phase: "Data analysis", weight: 0.16 },
    { phase: "Writing & discussion", weight: 0.14 },
    { phase: "Editing & submission", weight: 0.06 },
  ];

  let cursor = start.getTime();
  return phases.map((p) => {
    const s = new Date(cursor);
    cursor += total * p.weight;
    const e = new Date(cursor);
    return {
      phase: p.phase,
      start: s.toISOString().slice(0, 10),
      end: e.toISOString().slice(0, 10),
      percent: Math.round(p.weight * 100),
    };
  });
}

export function generateOutline(topic: string): { heading: string; points: string[] }[] {
  const t = topic.trim() || "your research topic";
  return [
    {
      heading: "1. Introduction",
      points: [
        `Background and context of ${t}`,
        "Statement of the problem",
        "Aim and specific objectives",
        "Research questions / hypotheses",
        "Significance and scope of the study",
      ],
    },
    {
      heading: "2. Literature Review",
      points: [
        "Conceptual / theoretical framework",
        "Review of empirical studies",
        "Identification of gaps in the literature",
      ],
    },
    {
      heading: "3. Methodology",
      points: [
        "Research design and approach",
        "Population, sample and sampling technique",
        "Data collection instruments",
        "Method of data analysis",
        "Ethical considerations",
      ],
    },
    {
      heading: "4. Expected Results & Timeline",
      points: ["Anticipated findings", "Work plan and Gantt schedule", "References (preliminary)"],
    },
  ];
}

export const grammarTips = [
  "Prefer the active voice for clarity: 'The study examined…' rather than 'It was examined…'.",
  "Keep tenses consistent: use past tense to report completed research and present tense for established facts.",
  "Avoid contractions (don't → do not) in formal academic writing.",
  "Define acronyms on first use, then use the acronym consistently.",
  "Use hedging carefully: 'may suggest' and 'appears to' signal appropriate academic caution.",
  "Ensure subject–verb agreement, especially with 'data' (plural) and 'criteria' (plural).",
];

export const writingTips = [
  "Write your abstract last — it should summarise what you actually did, not what you planned.",
  "One idea per paragraph. Start with a topic sentence and support it.",
  "Signpost your argument with transitions: 'however', 'consequently', 'in contrast'.",
  "Paraphrase and cite rather than quoting long passages — synthesis shows understanding.",
  "Align your conclusions strictly with your objectives and findings; don't introduce new data.",
  "Read your work aloud — awkward sentences reveal themselves to the ear.",
];
