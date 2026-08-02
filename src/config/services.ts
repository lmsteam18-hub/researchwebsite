import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  FileText,
  FlaskConical,
  GraduationCap,
  Languages,
  LayoutTemplate,
  LibraryBig,
  ListChecks,
  type LucideIcon,
  PenLine,
  Presentation,
  Quote,
  ScrollText,
  Sigma,
  Sparkles,
} from "lucide-react";

export type ServiceCategory =
  | "Writing & Structure"
  | "Editing & Quality"
  | "Data & Analysis"
  | "Publication & Review";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: LucideIcon;
  short: string;
  description: string;
  /** Relative pricing weight used by the estimator (1 = baseline). */
  priceFactor: number;
  /** Whether the deliverable is priced per page (true) or per project (false). */
  perPage: boolean;
  features: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    slug: "research-proposal",
    title: "Research Proposal",
    category: "Writing & Structure",
    icon: FileText,
    short: "Compelling, well-scoped proposals that get approved.",
    description:
      "Guidance on framing your problem statement, objectives, research questions, significance and methodology into a coherent, defensible proposal.",
    priceFactor: 1.15,
    perPage: true,
    features: [
      "Problem statement & justification",
      "Aim, objectives & research questions",
      "Methodology framing",
      "Supervisor-ready formatting",
    ],
    popular: true,
  },
  {
    slug: "thesis-support",
    title: "Thesis Support",
    category: "Writing & Structure",
    icon: GraduationCap,
    short: "End-to-end structural guidance for your thesis.",
    description:
      "Chapter-by-chapter structural support, argument coherence, and alignment between your objectives, findings and conclusions.",
    priceFactor: 1.25,
    perPage: true,
    features: [
      "Chapter structuring",
      "Argument flow & coherence",
      "Findings–objectives alignment",
      "Defense preparation notes",
    ],
    popular: true,
  },
  {
    slug: "dissertation-support",
    title: "Dissertation Support",
    category: "Writing & Structure",
    icon: ScrollText,
    short: "Comprehensive dissertation guidance and review.",
    description:
      "Support across all dissertation chapters with a focus on academic rigor, critical analysis and institutional requirements.",
    priceFactor: 1.3,
    perPage: true,
    features: [
      "All-chapter guidance",
      "Critical analysis review",
      "Institutional compliance",
      "Consistency & cross-referencing",
    ],
  },
  {
    slug: "assignments",
    title: "Assignment Guidance",
    category: "Writing & Structure",
    icon: ClipboardList,
    short: "Coaching and structure for coursework.",
    description:
      "Structural guidance, source suggestions and feedback to help you produce your own strong coursework — never ghostwritten submissions.",
    priceFactor: 0.9,
    perPage: true,
    features: [
      "Structure & outline coaching",
      "Source & argument suggestions",
      "Feedback on your drafts",
      "Referencing checks",
    ],
  },
  {
    slug: "proofreading",
    title: "Proofreading",
    category: "Editing & Quality",
    icon: CheckCircle2,
    short: "Catch every typo, slip and inconsistency.",
    description:
      "Meticulous proofreading for spelling, grammar, punctuation and consistency without changing your voice or argument.",
    priceFactor: 0.6,
    perPage: true,
    features: [
      "Spelling & grammar",
      "Punctuation & consistency",
      "Track-changes delivery",
      "24–48h turnaround options",
    ],
    popular: true,
  },
  {
    slug: "editing",
    title: "Academic Editing",
    category: "Editing & Quality",
    icon: PenLine,
    short: "Elevate clarity, tone and academic flow.",
    description:
      "Line and copy editing to sharpen clarity, tighten arguments and ensure a consistent scholarly tone throughout.",
    priceFactor: 0.85,
    perPage: true,
    features: [
      "Line & copy editing",
      "Clarity & concision",
      "Academic tone",
      "Sentence-level restructuring",
    ],
  },
  {
    slug: "formatting",
    title: "Formatting",
    category: "Editing & Quality",
    icon: LayoutTemplate,
    short: "Perfect formatting to institutional templates.",
    description:
      "Format your document to university or journal templates — margins, headings, TOC, captions, page numbers and more.",
    priceFactor: 0.5,
    perPage: false,
    features: [
      "University/journal templates",
      "Table of contents & lists",
      "Captions & numbering",
      "Word & LaTeX support",
    ],
  },
  {
    slug: "referencing",
    title: "Referencing",
    category: "Editing & Quality",
    icon: Quote,
    short: "Flawless citations in any style.",
    description:
      "Build and correct your reference list and in-text citations in APA, MLA, Harvard, Chicago, Vancouver, IEEE and more.",
    priceFactor: 0.45,
    perPage: false,
    features: [
      "In-text & full references",
      "APA / MLA / Harvard / IEEE",
      "Consistency checks",
      "Reference manager setup",
    ],
  },
  {
    slug: "plagiarism-check",
    title: "Plagiarism Check",
    category: "Editing & Quality",
    icon: FileSearch,
    short: "Similarity report with guided improvements.",
    description:
      "Run a similarity check and receive a detailed report plus guidance on paraphrasing and proper attribution to protect your integrity.",
    priceFactor: 0.4,
    perPage: false,
    features: [
      "Similarity report",
      "Section-by-section breakdown",
      "Attribution guidance",
      "Originality best-practices",
    ],
  },
  {
    slug: "spss-analysis",
    title: "SPSS Analysis",
    category: "Data & Analysis",
    icon: BarChart3,
    short: "Quantitative analysis, explained clearly.",
    description:
      "Descriptive and inferential statistics in SPSS with clear interpretation of outputs you can defend confidently.",
    priceFactor: 1.2,
    perPage: false,
    features: [
      "Descriptive & inferential stats",
      "Hypothesis testing",
      "Annotated output tables",
      "Plain-English interpretation",
    ],
    popular: true,
  },
  {
    slug: "r-programming",
    title: "R Programming",
    category: "Data & Analysis",
    icon: Sigma,
    short: "Reproducible analysis and visualisation in R.",
    description:
      "Statistical modelling, data wrangling and publication-quality visualisation using R and tidyverse, delivered as reproducible scripts.",
    priceFactor: 1.3,
    perPage: false,
    features: [
      "Reproducible R scripts",
      "Statistical modelling",
      "ggplot2 visualisation",
      "Commented, documented code",
    ],
  },
  {
    slug: "python-analysis",
    title: "Python Analysis",
    category: "Data & Analysis",
    icon: BrainCircuit,
    short: "Data science and analysis with Python.",
    description:
      "Data cleaning, analysis, machine-learning and visualisation with pandas, scikit-learn and matplotlib in documented notebooks.",
    priceFactor: 1.35,
    perPage: false,
    features: [
      "pandas data pipelines",
      "ML & statistical models",
      "Jupyter notebooks",
      "Clear methodology write-up",
    ],
  },
  {
    slug: "nvivo-analysis",
    title: "NVivo Analysis",
    category: "Data & Analysis",
    icon: FlaskConical,
    short: "Qualitative coding and thematic analysis.",
    description:
      "Thematic and content analysis of interviews and documents using NVivo, with codebooks and theme frameworks.",
    priceFactor: 1.25,
    perPage: false,
    features: [
      "Coding frameworks",
      "Thematic analysis",
      "Codebook development",
      "Visual theme maps",
    ],
  },
  {
    slug: "qualitative-research",
    title: "Qualitative Research",
    category: "Data & Analysis",
    icon: Languages,
    short: "Design and analysis for qualitative studies.",
    description:
      "Support for interview guides, focus groups, grounded theory and phenomenological analysis with rigorous methodology.",
    priceFactor: 1.2,
    perPage: false,
    features: [
      "Interview & focus-group design",
      "Grounded theory support",
      "Trustworthiness criteria",
      "Rich thematic write-up",
    ],
  },
  {
    slug: "questionnaire-design",
    title: "Questionnaire Design",
    category: "Data & Analysis",
    icon: ListChecks,
    short: "Valid, reliable instruments that measure well.",
    description:
      "Design surveys and questionnaires with validated scales, clear items and appropriate response formats aligned to your objectives.",
    priceFactor: 0.8,
    perPage: false,
    features: [
      "Validated scales",
      "Item construction",
      "Reliability considerations",
      "Pilot-ready instrument",
    ],
  },
  {
    slug: "literature-review",
    title: "Literature Review",
    category: "Publication & Review",
    icon: LibraryBig,
    short: "Critical synthesis of the evidence base.",
    description:
      "A structured, critical review that maps the field, identifies gaps and positions your study within current scholarship.",
    priceFactor: 1.1,
    perPage: true,
    features: [
      "Thematic synthesis",
      "Gap identification",
      "Conceptual framework",
      "Current, credible sources",
    ],
  },
  {
    slug: "systematic-review",
    title: "Systematic Review",
    category: "Publication & Review",
    icon: FileSearch,
    short: "PRISMA-compliant systematic reviews.",
    description:
      "Protocol design, search strategy, screening (PRISMA), data extraction and synthesis for systematic reviews and meta-analyses.",
    priceFactor: 1.45,
    perPage: false,
    features: [
      "PRISMA flow diagrams",
      "Search strategy design",
      "Screening & extraction",
      "Quality appraisal",
    ],
  },
  {
    slug: "journal-publication",
    title: "Journal Publication Support",
    category: "Publication & Review",
    icon: BookOpen,
    short: "From manuscript to accepted paper.",
    description:
      "Journal selection, manuscript formatting to author guidelines, cover letters and responses to reviewer comments.",
    priceFactor: 1.4,
    perPage: false,
    features: [
      "Journal selection",
      "Manuscript formatting",
      "Cover letter drafting",
      "Reviewer-response support",
    ],
    popular: true,
  },
  {
    slug: "powerpoint-presentation",
    title: "PowerPoint Presentation",
    category: "Publication & Review",
    icon: Presentation,
    short: "Defense-ready, beautiful slide decks.",
    description:
      "Turn your research into a clear, elegant presentation for your defense, conference or viva — with speaker notes.",
    priceFactor: 0.7,
    perPage: false,
    features: [
      "Defense-ready decks",
      "Data visualisation",
      "Speaker notes",
      "On-brand design",
    ],
  },
  {
    slug: "research-consultation",
    title: "Research Consultation",
    category: "Publication & Review",
    icon: Sparkles,
    short: "One-on-one guidance with an expert.",
    description:
      "Book a live session with a subject-matter consultant to unblock any stage of your research journey.",
    priceFactor: 1.0,
    perPage: false,
    features: [
      "Live video sessions",
      "Any research stage",
      "Actionable next steps",
      "Session recording & notes",
    ],
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Writing & Structure",
  "Editing & Quality",
  "Data & Analysis",
  "Publication & Review",
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
