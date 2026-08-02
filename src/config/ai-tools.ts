import {
  CalendarClock,
  FileStack,
  HelpCircle,
  Lightbulb,
  ListTree,
  type LucideIcon,
  PenTool,
  Quote,
  SpellCheck2,
} from "lucide-react";

export type ToolKind =
  | "topic-generator"
  | "question-generator"
  | "citation-generator"
  | "reference-formatter"
  | "timeline-planner"
  | "outline-generator"
  | "grammar-tips"
  | "writing-tips";

export interface AiTool {
  id: ToolKind;
  title: string;
  short: string;
  icon: LucideIcon;
}

export const aiTools: AiTool[] = [
  {
    id: "topic-generator",
    title: "Research Topic Generator",
    short: "Spark focused, researchable topic ideas in your field.",
    icon: Lightbulb,
  },
  {
    id: "question-generator",
    title: "Research Question Generator",
    short: "Turn a topic into sharp, answerable research questions.",
    icon: HelpCircle,
  },
  {
    id: "citation-generator",
    title: "Citation Generator",
    short: "Build correctly formatted citations in seconds.",
    icon: Quote,
  },
  {
    id: "reference-formatter",
    title: "Reference Formatter",
    short: "Clean up and standardise your reference list.",
    icon: FileStack,
  },
  {
    id: "timeline-planner",
    title: "Research Timeline Planner",
    short: "Map milestones from proposal to submission.",
    icon: CalendarClock,
  },
  {
    id: "outline-generator",
    title: "Proposal Outline Generator",
    short: "Get a solid structural outline to build on yourself.",
    icon: ListTree,
  },
  {
    id: "grammar-tips",
    title: "Grammar Suggestions",
    short: "Spot common academic-writing grammar pitfalls.",
    icon: SpellCheck2,
  },
  {
    id: "writing-tips",
    title: "Academic Writing Tips",
    short: "Actionable tips to sharpen your scholarly voice.",
    icon: PenTool,
  },
];
