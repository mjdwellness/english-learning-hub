import pronunciationAsset from "@/assets/book-pronunciation.jpg.asset.json";
import speak2Asset from "@/assets/book-speak-2.jpg.asset.json";
import speak1Asset from "@/assets/book-speak-1.jpg.asset.json";
import expressionsAsset from "@/assets/book-expressions.jpg.asset.json";
import ipaAsset from "@/assets/book-ipa.jpg.asset.json";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "All levels";

export type Category =
  | "Grammar"
  | "Vocabulary"
  | "Speaking"
  | "Writing"
  | "Reading"
  | "Conversation"
  | "Pronunciation";

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

const printDefaults = {
  podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
  interiorSourceUrl: "https://example.com/placeholder-interior.pdf",
  coverSourceUrl: "https://example.com/placeholder-cover.pdf",
};

/**
 * Real catalogue — Yes-Yorlens English School books by Yorlens Ricardo Louis.
 * Everything on the site (homepage, /books, product pages, bundles, cart,
 * library) is driven from this array.
 */
export const books: Book[] = [
  {
    id: "bk-speak-1",
    slug: "aprann-pale-angle-book-1",
    title: "Aprann Pale Anglè — Book 1",
    subtitle: "Depi a zewo jis nan nivo avanse",
    cover: speak1Asset.url,
    price: 14.99,
    compareAtPrice: 19.99,
    rating: 4.9,
    reviewCount: 142,
    categories: ["Speaking", "Conversation", "Grammar"],
    level: "Beginner",
    format: "PDF + Print",
    pages: 140,
    language: "Kreyòl / English",
    fileSize: "6.4 MB",
    description:
      "Premye liv nan metòd Yes-Yorlens English School la. Li mennen w depi a zewo jiska nivo avanse ak leson klè, egzanp konkrè an anglè ak kreyòl, ak egzèsis pou w pratike chak jou.",
    learn: [
      "Pale anglè depi premye leson an",
      "Konprann estrikti fraz anglè yo fasilman",
      "Aprann vokabilè de baz ak pwononsyasyon kòrèk",
      "Pratike ak dyalòg ak egzèsis korije",
    ],
    sample: [
      "Leson 1 — Salitasyon ak prezantasyon",
      "Leson 2 — Vèb yo nan prezan",
      "Leson 3 — Poze kesyon an anglè",
    ],
    featured: true,
    print: { ...printDefaults, price: 24.99 },
  },
  {
    id: "bk-speak-2",
    slug: "aprann-pale-angle-book-2",
    title: "Aprann Pale Anglè — Book 2",
    subtitle: "Kontinye jis rive nan nivo avanse",
    cover: speak2Asset.url,
    price: 14.99,
    compareAtPrice: 19.99,
    rating: 4.8,
    reviewCount: 118,
    categories: ["Speaking", "Conversation"],
    level: "Intermediate",
    format: "PDF + Print",
    pages: 152,
    language: "Kreyòl / English",
    fileSize: "6.8 MB",
    description:
      "Dezyèm liv nan metòd la. Li kontinye kote Book 1 fini ak konvèsasyon pi long, tan vèb yo pi avanse, ak ekspresyon ou bezwen pou w pale anglè natirèlman.",
    learn: [
      "Pale pandan plizyè minit san w pa bloke",
      "Metrize tan vèb yo nan pase ak fiti",
      "Fè konvèsasyon nan travay ak vwayaj",
      "Rive nan nivo entèmedyè-avanse etap pa etap",
    ],
    sample: [
      "Leson 1 — Rakonte yon istwa nan pase",
      "Leson 2 — Fè plan pou demen",
      "Leson 3 — Konvèsasyon nan travay",
    ],
    featured: true,
    print: { ...printDefaults, price: 25.99 },
  },
  {
    id: "bk-pronunciation",
    slug: "metod-pwononsyasyon-angle",
    title: "Metòd Pwononsyasyon Anglè",
    subtitle: "Byen pwononse e li an anglè ak tout vokabilè yo",
    cover: pronunciationAsset.url,
    price: 12.99,
    rating: 4.8,
    reviewCount: 96,
    categories: ["Pronunciation", "Reading", "Vocabulary"],
    level: "All levels",
    format: "PDF + Print",
    pages: 118,
    language: "Kreyòl / English",
    fileSize: "5.2 MB",
    description:
      "Yon metòd konplè pou w byen pwononse ak byen li an anglè. Chak son gen esplikasyon senp, egzanp mo, ak konparezon ak son kreyòl ak fransè yo.",
    learn: [
      "Pwononse chak son anglè kòrèkteman",
      "Li nenpòt mo anglè san ezitasyon",
      "Konprann diferans ant son ki sanble",
      "Bati vokabilè w ak bon pwononsyasyon",
    ],
    sample: [
      "Pati 1 — Son vwayèl yo",
      "Pati 2 — Son konsòn yo",
      "Pati 3 — Aksan ak entonasyon",
    ],
    featured: true,
    print: { ...printDefaults, price: 21.99 },
  },
  {
    id: "bk-expressions",
    slug: "400-ekspresyon-angle",
    title: "Aprann Plis Pase 400 Ekspresyon Anglè",
    subtitle: "Ekspresyon nòmal e avanse + 340 lòt ekspresyon, 55 abrevyasyon ak audio",
    cover: expressionsAsset.url,
    price: 13.99,
    compareAtPrice: 17.99,
    rating: 4.7,
    reviewCount: 88,
    categories: ["Vocabulary", "Speaking", "Conversation"],
    level: "Intermediate",
    format: "PDF",
    pages: 130,
    language: "Kreyòl / English",
    fileSize: "7.5 MB",
    description:
      "Plis pase 400 ekspresyon anglè nòmal ak avanse, plis 340 lòt ekspresyon ak 55 abrevyasyon ak pwononsyasyon yo — ak audio pou w tande chak ekspresyon.",
    learn: [
      "Sèvi ak ekspresyon anglè moun reyèlman pale",
      "Konprann abrevyasyon nan mesaj ak chat",
      "Tande ak repete ak audio ki mache ak liv la",
      "Pale pi natirèl nan konvèsasyon chak jou",
    ],
    sample: [
      "Seksyon 1 — 100 premye ekspresyon yo",
      "Seksyon 2 — Ekspresyon avanse",
      "Seksyon 3 — Abrevyasyon ak pwononsyasyon",
    ],
    featured: true,
  },
  {
    id: "bk-ipa",
    slug: "ipa-44-sounds",
    title: "IPA — International Phonetic Alphabet",
    subtitle: "The 44 sounds of English explained simply",
    cover: ipaAsset.url,
    price: 11.99,
    rating: 4.7,
    reviewCount: 64,
    categories: ["Pronunciation", "Reading"],
    level: "All levels",
    format: "PDF + Print",
    pages: 96,
    language: "Kreyòl / English",
    fileSize: "4.6 MB",
    description:
      "Yon gid konplè sou alfabè fonetik entènasyonal la ak 44 son anglè yo. Chak son gen senbòl li, egzanp mo, ak esplikasyon sou kijan pou w plase bouch ou.",
    learn: [
      "Rekonèt tout 44 son anglè yo",
      "Li transkripsyon fonetik nan diksyonè",
      "Korije erè pwononsyasyon ki pi komen yo",
      "Amelyore aksan w ak egzèsis presi",
    ],
    sample: [
      "Chapit 1 — Kisa IPA a ye",
      "Chapit 2 — 20 son vwayèl yo",
      "Chapit 3 — 24 son konsòn yo",
    ],
    featured: true,
    print: { ...printDefaults, price: 19.99 },
  },
];

export const categories: Category[] = [
  "Speaking",
  "Conversation",
  "Pronunciation",
  "Vocabulary",
  "Grammar",
  "Reading",
  "Writing",
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
    tagline: "Kòmanse depi a zewo ak yon chemen klè.",
    bookIds: ["bk-speak-1", "bk-pronunciation"],
    price: 24.99,
  },
  {
    id: "bd-speaking",
    slug: "speaking-mastery",
    name: "Speaking Mastery",
    tagline: "De liv metòd la plis 400+ ekspresyon pou w pale natirèlman.",
    bookIds: ["bk-speak-1", "bk-speak-2", "bk-expressions"],
    price: 37.99,
    badge: "Most popular",
  },
  {
    id: "bd-complete",
    slug: "complete-english-learning",
    name: "Complete English Learning",
    tagline: "Tout liv yo — sistèm aprantisaj konplè a.",
    bookIds: ["bk-speak-1", "bk-speak-2", "bk-pronunciation", "bk-expressions", "bk-ipa"],
    price: 54.99,
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
      "The pronunciation method finally made English sounds click for me. Short lessons, clear examples, no filler.",
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
