import speakCover from "@/assets/book-speak.jpg";
import grammarCover from "@/assets/book-grammar.jpg";
import writingCover from "@/assets/book-writing.jpg";
import vocabularyCover from "@/assets/book-vocabulary.jpg";
import conversationCover from "@/assets/book-conversation.jpg";
import readingCover from "@/assets/book-reading.jpg";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "All levels";

export type Category =
  | "Grammar"
  | "Vocabulary"
  | "Speaking"
  | "Writing"
  | "Reading"
  | "Conversation";

export interface PrintOption {
  /** Lulu pod package identifier (e.g. "0600X0900BWSTDCE01", "0425X0687FCSTDUS") */
  podPackageId: string;
  /** Selling price of the printed book */
  price: number;
  /** Interior PDF source URL used by Lulu for print-on-demand */
  interiorSourceUrl: string;
  /** Book cover source URL used by Lulu */
  coverSourceUrl: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  /** Digital-download price */
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  categories: Category[];
  level: Level;
  /** Default format shown in the catalogue */
  format: "PDF" | "EPUB" | "PDF + EPUB" | "Print" | "PDF + Print";
  pages: number;
  language: string;
  fileSize: string;
  description: string;
  learn: string[];
  sample: string[];
  featured?: boolean;
  /** Print-on-demand configuration. When present, the book can be ordered as a paperback. */
  print?: PrintOption;
}

/**
 * Replace these entries with real products. Everything on the site
 * (homepage, /books, product pages, bundles, cart, library) is driven
 * from this array.
 */
export const books: Book[] = [
  {
    id: "bk-speak",
    slug: "speak-english-confidently",
    title: "Speak English Confidently",
    subtitle: "Practical speaking skills for real-life situations",
    cover: speakCover,
    price: 14.99,
    compareAtPrice: 19.99,
    rating: 4.8,
    reviewCount: 128,
    categories: ["Speaking", "Conversation"],
    level: "All levels",
    format: "PDF + Print",
    pages: 120,
    language: "English",
    fileSize: "4.5 MB",
    description:
      "A practical speaking course you can work through at your own pace. Learn how to speak English clearly and confidently in everyday situations — introductions, work meetings, travel, interviews and small talk — with model dialogues, pronunciation notes and speaking drills.",
    learn: [
      "Improve your fluency in everyday conversations",
      "Handle real-life conversations with confidence",
      "Use natural phrases, idioms and useful expressions",
      "Reduce hesitation with structured speaking drills",
    ],
    sample: [
      "Chapter 1 — Sounding natural from the first sentence",
      "Chapter 2 — Small talk that never runs dry",
      "Chapter 3 — Speaking clearly under pressure",
    ],
    featured: true,
    print: {
      podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
      price: 24.99,
      interiorSourceUrl: "https://example.com/placeholder-interior.pdf",
      coverSourceUrl: "https://example.com/placeholder-cover.pdf",
    },
  },
  {
    id: "bk-grammar",
    slug: "english-grammar-made-easy",
    title: "English Grammar Made Easy",
    subtitle: "A clear and simple guide to English grammar",
    cover: grammarCover,
    price: 13.99,
    compareAtPrice: 17.99,
    rating: 4.7,
    reviewCount: 96,
    categories: ["Grammar"],
    level: "Beginner",
    format: "PDF + Print",
    pages: 148,
    language: "English",
    fileSize: "5.1 MB",
    description:
      "Grammar explained the way it should be: short rules, clear examples and exercises that build real understanding. Covers tenses, articles, prepositions, conditionals and the mistakes learners make most often.",
    learn: [
      "Understand every English tense and when to use it",
      "Fix the most common grammar mistakes for good",
      "Build correct sentences without overthinking",
      "Practise with 200+ graded exercises and answers",
    ],
    sample: [
      "Chapter 1 — Present tenses in real use",
      "Chapter 2 — Articles: a, an, the (and none)",
      "Chapter 3 — Prepositions that finally make sense",
    ],
    featured: true,
    print: {
      podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
      price: 22.99,
      interiorSourceUrl: "https://example.com/placeholder-interior.pdf",
      coverSourceUrl: "https://example.com/placeholder-cover.pdf",
    },
  },
  {
    id: "bk-writing",
    slug: "english-writing-step-by-step",
    title: "English Writing Step by Step",
    subtitle: "Improve your writing skills for every purpose",
    cover: writingCover,
    price: 13.99,
    rating: 4.6,
    reviewCount: 75,
    categories: ["Writing", "Grammar"],
    level: "Intermediate",
    format: "PDF + EPUB",
    pages: 132,
    language: "English",
    fileSize: "6.2 MB",
    description:
      "From clear sentences to complete essays and professional emails. A step-by-step method with templates, before/after rewrites and checklists you can reuse for study or work.",
    learn: [
      "Structure paragraphs and essays with confidence",
      "Write professional emails that get replies",
      "Edit your own writing with a simple checklist",
      "Expand your academic and formal vocabulary",
    ],
    sample: [
      "Chapter 1 — The clear sentence",
      "Chapter 2 — Paragraphs that flow",
      "Chapter 3 — Emails at work",
    ],
    featured: true,
  },
  {
    id: "bk-vocabulary",
    slug: "english-vocabulary-in-use",
    title: "English Vocabulary in Use",
    subtitle: "Build and understand words in everyday English",
    cover: vocabularyCover,
    price: 12.99,
    rating: 4.6,
    reviewCount: 82,
    categories: ["Vocabulary", "Reading"],
    level: "Intermediate",
    format: "PDF + Print",
    pages: 156,
    language: "English",
    fileSize: "5.8 MB",
    description:
      "2,000 high-frequency words and phrases grouped by real-life topics, with example sentences, collocations and spaced-repetition review pages so new vocabulary actually sticks.",
    learn: [
      "Learn 2,000 words you will genuinely use",
      "Master collocations and word families",
      "Review efficiently with spaced repetition pages",
      "Talk about work, travel, health and technology",
    ],
    sample: [
      "Unit 1 — People and personality",
      "Unit 2 — Work and money",
      "Unit 3 — Travel and transport",
    ],
    featured: true,
    print: {
      podPackageId: "0600X0900BWSTDCE01",
      price: 21.99,
      interiorSourceUrl: "https://example.com/placeholder-interior.pdf",
      coverSourceUrl: "https://example.com/placeholder-cover.pdf",
    },
  },
  {
    id: "bk-conversation",
    slug: "english-conversation-practice",
    title: "English Conversation Practice",
    subtitle: "Practice real conversations with confidence",
    cover: conversationCover,
    price: 12.99,
    rating: 4.5,
    reviewCount: 63,
    categories: ["Conversation", "Speaking"],
    level: "All levels",
    format: "PDF + Print",
    pages: 110,
    language: "English",
    fileSize: "4.1 MB",
    description:
      "Sixty guided conversations with model answers, follow-up questions and role-play prompts. Perfect for self-study, language partners or classroom use.",
    learn: [
      "Keep a conversation going naturally",
      "Ask better follow-up questions",
      "Use polite and informal registers correctly",
      "Practise 60 role-plays for everyday situations",
    ],
    sample: [
      "Conversation 1 — Meeting someone new",
      "Conversation 2 — At the doctor",
      "Conversation 3 — A job interview",
    ],
    featured: true,
    print: {
      podPackageId: "0600X0900BWSTDCE01",
      price: 21.99,
      interiorSourceUrl: "https://example.com/placeholder-interior.pdf",
      coverSourceUrl: "https://example.com/placeholder-cover.pdf",
    },
  },
  {
    id: "bk-reading",
    slug: "english-reading-comprehension",
    title: "English Reading Comprehension",
    subtitle: "Improve your reading and understanding",
    cover: readingCover,
    price: 12.99,
    rating: 4.5,
    reviewCount: 70,
    categories: ["Reading", "Vocabulary"],
    level: "Advanced",
    format: "PDF",
    pages: 140,
    language: "English",
    fileSize: "5.4 MB",
    description:
      "Thirty graded reading passages with comprehension questions, vocabulary notes and strategies for skimming, scanning and inference — ideal for exam preparation.",
    learn: [
      "Read faster without losing comprehension",
      "Answer inference questions accurately",
      "Guess meaning from context reliably",
      "Prepare for exam-style reading tasks",
    ],
    sample: [
      "Passage 1 — The city that reads",
      "Passage 2 — A short history of coffee",
      "Passage 3 — Working from anywhere",
    ],
    featured: true,
  },
];

export const categories: Category[] = [
  "Grammar",
  "Vocabulary",
  "Speaking",
  "Writing",
  "Reading",
  "Conversation",
];

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced", "All levels"];

export function getBookBySlug(slug: string) {
  return books.find((b) => b.slug === slug);
}

export function getBookById(id: string) {
  return books.find((b) => b.id === id);
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bookIds: string[];
  price: number;
  badge?: string;
}

export const bundles: Bundle[] = [
  {
    id: "bd-beginner",
    slug: "beginner-bundle",
    name: "Beginner Bundle",
    tagline: "Start from the basics with a clear, guided path.",
    bookIds: ["bk-grammar", "bk-speak", "bk-conversation"],
    price: 32.99,
  },
  {
    id: "bd-grammar",
    slug: "grammar-mastery",
    name: "Grammar Mastery",
    tagline: "Grammar, writing and vocabulary that reinforce each other.",
    bookIds: ["bk-grammar", "bk-writing", "bk-vocabulary", "bk-reading"],
    price: 42.99,
    badge: "Most popular",
  },
  {
    id: "bd-complete",
    slug: "complete-english-learning",
    name: "Complete English Learning",
    tagline: "Every book in the library — the full learning system.",
    bookIds: [
      "bk-speak",
      "bk-grammar",
      "bk-writing",
      "bk-vocabulary",
      "bk-conversation",
      "bk-reading",
    ],
    price: 59.99,
    badge: "Best value",
  },
];

export function bundleBooks(bundle: Bundle) {
  return bundle.bookIds.map((id) => getBookById(id)).filter((b): b is Book => Boolean(b));
}

export function bundleOriginalTotal(bundle: Bundle) {
  return bundleBooks(bundle).reduce((sum, b) => sum + b.price, 0);
}

export function getBundleBySlug(slug: string) {
  return bundles.find((b) => b.slug === slug);
}

export const testimonials = [
  {
    name: "Marta S.",
    role: "Nurse, Poland",
    quote:
      "The speaking book gave me scripts for real situations at work. After six weeks I stopped rehearsing sentences in my head.",
    rating: 5,
  },
  {
    name: "Kenji T.",
    role: "Software engineer, Japan",
    quote:
      "Grammar Made Easy is the first grammar book I actually finished. Short rules, clear examples, no filler.",
    rating: 5,
  },
  {
    name: "Amina D.",
    role: "University student, Morocco",
    quote:
      "I bought the Complete bundle and use Yorlingo on the bus. The combination keeps me consistent every day.",
    rating: 5,
  },
];
