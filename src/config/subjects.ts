/** Academic disciplines. `complexity` feeds the pricing estimator. */
export interface Subject {
  name: string;
  emoji: string;
  complexity: number; // 0.9 (lighter) .. 1.35 (heaviest)
}

export const subjects: Subject[] = [
  { name: "Education", emoji: "🎓", complexity: 1.0 },
  { name: "Medicine", emoji: "🩺", complexity: 1.35 },
  { name: "Law", emoji: "⚖️", complexity: 1.2 },
  { name: "Engineering", emoji: "⚙️", complexity: 1.3 },
  { name: "Business", emoji: "📊", complexity: 1.0 },
  { name: "Computer Science", emoji: "💻", complexity: 1.25 },
  { name: "Accounting", emoji: "🧾", complexity: 1.05 },
  { name: "Economics", emoji: "📈", complexity: 1.1 },
  { name: "Statistics", emoji: "🔢", complexity: 1.3 },
  { name: "Nursing", emoji: "🏥", complexity: 1.2 },
  { name: "Psychology", emoji: "🧠", complexity: 1.1 },
  { name: "Public Health", emoji: "🌍", complexity: 1.15 },
  { name: "Agriculture", emoji: "🌾", complexity: 1.0 },
  { name: "Architecture", emoji: "🏛️", complexity: 1.15 },
  { name: "Political Science", emoji: "🏛", complexity: 1.05 },
  { name: "Mass Communication", emoji: "📰", complexity: 0.95 },
  { name: "Sociology", emoji: "👥", complexity: 1.0 },
  { name: "Pharmacy", emoji: "💊", complexity: 1.25 },
  { name: "Environmental Science", emoji: "♻️", complexity: 1.1 },
  { name: "International Relations", emoji: "🕊️", complexity: 1.05 },
];

export const referenceStyles = [
  "APA 7th",
  "APA 6th",
  "MLA",
  "Harvard",
  "Chicago",
  "Vancouver",
  "IEEE",
  "OSCOLA",
  "Other",
] as const;

export function getSubject(name: string) {
  return subjects.find((s) => s.name === name);
}
