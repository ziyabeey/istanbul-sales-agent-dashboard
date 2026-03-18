// ---------------------------------------------------------------------------
// Font Catalog — 50+ Turkish-compatible Google Fonts, pairs & helpers
// Pure data file, no React imports needed.
// ---------------------------------------------------------------------------

/* ----------------------------- Types ------------------------------------ */

export interface FontItem {
  family: string;
  category: "serif" | "sans-serif" | "display" | "handwriting" | "monospace";
  weights: number[];
  turkishSupport: boolean;
  pairsWith?: string[];
  popularity: number;
}

export interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  mood: string;
}

export interface FontCategory {
  id: string;
  label: string;
}

/* ----------------------------- Catalog ---------------------------------- */

export const FONT_CATALOG: FontItem[] = [
  // ── SANS-SERIF (~17) ──────────────────────────────────────────────────
  {
    family: "Inter",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Playfair Display", "Lora", "Source Serif 4"],
    popularity: 98,
  },
  {
    family: "Plus Jakarta Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Lora", "DM Serif Display"],
    popularity: 90,
  },
  {
    family: "DM Sans",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["DM Serif Display", "Playfair Display"],
    popularity: 89,
  },
  {
    family: "Outfit",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Crimson Pro"],
    popularity: 84,
  },
  {
    family: "Nunito",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Merriweather", "Lora"],
    popularity: 92,
  },
  {
    family: "Source Sans 3",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Source Serif 4", "Playfair Display"],
    popularity: 88,
  },
  {
    family: "Syne",
    category: "sans-serif",
    weights: [400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Lora", "Inter"],
    popularity: 76,
  },
  {
    family: "Space Grotesk",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Crimson Pro", "Source Serif 4"],
    popularity: 82,
  },
  {
    family: "Manrope",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Playfair Display", "Libre Baskerville"],
    popularity: 86,
  },
  {
    family: "Poppins",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Lora", "Merriweather"],
    popularity: 97,
  },
  {
    family: "Raleway",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Merriweather", "Lora"],
    popularity: 91,
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Bitter", "Libre Baskerville"],
    popularity: 87,
  },
  {
    family: "Rubik",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Cormorant Garamond", "Lora"],
    popularity: 85,
  },
  {
    family: "Montserrat",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Merriweather", "Source Serif 4"],
    popularity: 96,
  },
  {
    family: "Nunito Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Crimson Pro"],
    popularity: 83,
  },
  {
    family: "Albert Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["DM Serif Display", "Playfair Display"],
    popularity: 74,
  },
  {
    family: "Figtree",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Source Serif 4"],
    popularity: 78,
  },

  // ── SERIF (~9) ────────────────────────────────────────────────────────
  {
    family: "Playfair Display",
    category: "serif",
    weights: [400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Inter", "DM Sans", "Manrope"],
    popularity: 94,
  },
  {
    family: "Lora",
    category: "serif",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "Poppins", "Outfit"],
    popularity: 93,
  },
  {
    family: "Merriweather",
    category: "serif",
    weights: [300, 400, 700],
    turkishSupport: true,
    pairsWith: ["Montserrat", "Raleway", "Nunito"],
    popularity: 90,
  },
  {
    family: "Source Serif 4",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Source Sans 3", "Inter", "Space Grotesk"],
    popularity: 81,
  },
  {
    family: "Cormorant Garamond",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Rubik", "Poppins", "Montserrat"],
    popularity: 80,
  },
  {
    family: "DM Serif Display",
    category: "serif",
    weights: [400],
    turkishSupport: true,
    pairsWith: ["DM Sans", "Plus Jakarta Sans", "Albert Sans"],
    popularity: 79,
  },
  {
    family: "Bitter",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Work Sans", "Raleway"],
    popularity: 77,
  },
  {
    family: "Crimson Pro",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Outfit", "Space Grotesk", "Nunito Sans"],
    popularity: 75,
  },
  {
    family: "Libre Baskerville",
    category: "serif",
    weights: [400, 700],
    turkishSupport: true,
    pairsWith: ["Manrope", "Work Sans"],
    popularity: 73,
  },

  // ── DISPLAY (~4) ─────────────────────────────────────────────────────
  {
    family: "Bebas Neue",
    category: "display",
    weights: [400],
    turkishSupport: true,
    pairsWith: ["Inter", "DM Sans", "Poppins"],
    popularity: 88,
  },
  {
    family: "Archivo Black",
    category: "display",
    weights: [400],
    turkishSupport: true,
    pairsWith: ["Inter", "Source Sans 3"],
    popularity: 72,
  },
  {
    family: "Oswald",
    category: "display",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Merriweather", "Nunito"],
    popularity: 93,
  },
  {
    family: "Abril Fatface",
    category: "display",
    weights: [400],
    turkishSupport: true,
    pairsWith: ["Poppins", "Raleway", "Nunito"],
    popularity: 71,
  },

  // ── HANDWRITING (~3) ─────────────────────────────────────────────────
  {
    family: "Dancing Script",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Montserrat", "Poppins"],
    popularity: 86,
  },
  {
    family: "Caveat",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "DM Sans"],
    popularity: 82,
  },
  {
    family: "Pacifico",
    category: "handwriting",
    weights: [400],
    turkishSupport: true,
    pairsWith: ["Raleway", "Montserrat"],
    popularity: 80,
  },

  // ── MONOSPACE (~2) ───────────────────────────────────────────────────
  {
    family: "JetBrains Mono",
    category: "monospace",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "DM Sans"],
    popularity: 79,
  },
  {
    family: "Fira Code",
    category: "monospace",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "Source Sans 3"],
    popularity: 78,
  },

  // ── Extra entries to exceed 50 ────────────────────────────────────────
  {
    family: "Karla",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Merriweather"],
    popularity: 81,
  },
  {
    family: "Cabin",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Bitter"],
    popularity: 80,
  },
  {
    family: "Barlow",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Playfair Display", "Crimson Pro"],
    popularity: 83,
  },
  {
    family: "Lexend",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Source Serif 4"],
    popularity: 77,
  },
  {
    family: "Mulish",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Playfair Display", "Lora"],
    popularity: 85,
  },
  {
    family: "Quicksand",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Cormorant Garamond", "Lora"],
    popularity: 88,
  },
  {
    family: "Josefin Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Libre Baskerville"],
    popularity: 86,
  },
  {
    family: "Exo 2",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Merriweather", "Lora"],
    popularity: 76,
  },
  {
    family: "Titillium Web",
    category: "sans-serif",
    weights: [300, 400, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Crimson Pro"],
    popularity: 84,
  },
  {
    family: "Overpass",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    turkishSupport: true,
    pairsWith: ["Merriweather", "Bitter"],
    popularity: 72,
  },
  {
    family: "Spectral",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "Manrope"],
    popularity: 70,
  },
  {
    family: "Literata",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["DM Sans", "Outfit"],
    popularity: 69,
  },
  {
    family: "Vollkorn",
    category: "serif",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "Poppins"],
    popularity: 74,
  },
  {
    family: "Fraunces",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Inter", "DM Sans"],
    popularity: 68,
  },
  {
    family: "Signika",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Merriweather"],
    popularity: 75,
  },
  {
    family: "Asap",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Bitter"],
    popularity: 73,
  },
  {
    family: "PT Sans",
    category: "sans-serif",
    weights: [400, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Merriweather"],
    popularity: 90,
  },
  {
    family: "PT Serif",
    category: "serif",
    weights: [400, 700],
    turkishSupport: true,
    pairsWith: ["PT Sans", "Inter"],
    popularity: 82,
  },
  {
    family: "Archivo",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Lora", "Crimson Pro"],
    popularity: 79,
  },
  {
    family: "Noto Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Noto Serif", "Playfair Display"],
    popularity: 95,
  },
  {
    family: "Noto Serif",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    turkishSupport: true,
    pairsWith: ["Noto Sans", "Inter"],
    popularity: 84,
  },
];

/* ----------------------------- Font Pairs ------------------------------- */

export const FONT_PAIRS: FontPair[] = [
  {
    id: "zarif-modern",
    name: "Zarif & Modern",
    heading: "Playfair Display",
    body: "Inter",
    mood: "Zarif & Modern",
  },
  {
    id: "cesur-teknolojik",
    name: "Cesur & Teknolojik",
    heading: "Space Grotesk",
    body: "DM Sans",
    mood: "Cesur & Teknolojik",
  },
  {
    id: "luks-sik",
    name: "Lüks & Şık",
    heading: "Cormorant Garamond",
    body: "Montserrat",
    mood: "Lüks & Şık",
  },
  {
    id: "sicak-guvenilir",
    name: "Sıcak & Güvenilir",
    heading: "Lora",
    body: "Nunito",
    mood: "Sıcak & Güvenilir",
  },
  {
    id: "temiz-profesyonel",
    name: "Temiz & Profesyonel",
    heading: "Plus Jakarta Sans",
    body: "Source Sans 3",
    mood: "Temiz & Profesyonel",
  },
  {
    id: "editoryal-karakterli",
    name: "Editoryal & Karakterli",
    heading: "DM Serif Display",
    body: "Outfit",
    mood: "Editoryal & Karakterli",
  },
  {
    id: "enerjik-genc",
    name: "Enerjik & Genç",
    heading: "Syne",
    body: "Poppins",
    mood: "Enerjik & Genç",
  },
  {
    id: "samimi-yumusak",
    name: "Samimi & Yumuşak",
    heading: "Quicksand",
    body: "Nunito Sans",
    mood: "Samimi & Yumuşak",
  },
  {
    id: "klasik-otoriter",
    name: "Klasik & Otoriter",
    heading: "Oswald",
    body: "Merriweather",
    mood: "Klasik & Otoriter",
  },
  {
    id: "guclu-dikkat-cekici",
    name: "Güçlü & Dikkat Çekici",
    heading: "Bebas Neue",
    body: "Inter",
    mood: "Güçlü & Dikkat Çekici",
  },
];

/* ----------------------------- Categories ------------------------------- */

export const FONT_CATEGORIES: FontCategory[] = [
  { id: "all", label: "Tümü" },
  { id: "sans-serif", label: "Sans-Serif" },
  { id: "serif", label: "Serif" },
  { id: "display", label: "Display" },
  { id: "handwriting", label: "El Yazısı" },
];

/* ----------------------------- Helpers ---------------------------------- */

/**
 * Generates a Google Fonts CSS2 URL that loads the given families with
 * weights 400, 500, 600, 700.
 *
 * @example
 * buildGoogleFontsUrl(["Inter", "Playfair Display"])
 * // "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
 */
export function buildGoogleFontsUrl(families: string[]): string {
  const weights = "400;500;600;700";
  const params = families
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@${weights}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
