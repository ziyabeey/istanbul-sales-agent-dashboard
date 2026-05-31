import fs from 'fs';

const fsPromises = fs.promises;

// 40 Sektör (P0, P1, P2, P3)
const SECTORS = [
  'berber', 'restoran', 'doktor', 'guzellik', 'avukat', 'dis', 'oto', 'spor',
  'kafe', 'firin', 'eczane', 'veteriner', 'fotografci', 'dugun', 'elektrikci', 'tesisatci', 'muhasebeci', 'emlak', 'ozelders', 'kuyumcu',
  'psikolog', 'fastfood', 'bar', 'telefon', 'klima', 'mimarlik', 'sigorta', 'surucu', 'dil', 'yoga',
  'optik', 'petshop', 'cicekci', 'terzi', 'halisaha', 'yuzme', 'catering', 'kasap', 'cilingir', 'muzik'
];

const PLANS = ['free', 'starter', 'growth', 'pro', 'enterprise'];

// Boyut Havuzları
const VISUAL_LANGUAGES = ['minimal-clean', 'vintage-warm', 'dark-neon', 'luxury-gold', 'industrial-bold', 'pastel-soft', 'editorial-magazine', 'brutalist-raw'];
const HEADING_FONTS = ['Inter', 'Playfair Display', 'Syne', 'Cormorant Garamond', 'Space Grotesk', 'Outfit', 'Bebas Neue', 'Oswald', 'Lora', 'Merriweather', 'DM Serif Display', 'Clash Display', 'Cabinet Grotesk', 'Cinzel', 'Archivo Black'];
const BODY_FONTS = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Nunito', 'Poppins', 'Work Sans'];

// Plan tabanlı kurallar
const PLAN_RULES: Record<string, any> = {
  free: {
    layout: 'single-column',
    container: 'sm',
    headingSize: 'small',
    animation: 'none',
    contentDepth: 'minimal',
    accentUsage: 'cta-only',
    sections: 4
  },
  starter: {
    layout: 'split-panels',
    container: 'md',
    headingSize: 'medium',
    animation: 'subtle',
    contentDepth: 'standard',
    accentUsage: 'section-backgrounds',
    sections: 6
  },
  growth: {
    layout: 'asymmetric',
    container: 'lg',
    headingSize: 'large',
    animation: 'moderate',
    contentDepth: 'detailed',
    accentUsage: 'highlights-and-lines',
    sections: 8
  },
  pro: {
    layout: 'editorial-zigzag',
    container: 'xl',
    headingSize: 'xlarge',
    animation: 'rich',
    contentDepth: 'editorial',
    accentUsage: 'gradient-hero',
    sections: 10
  },
  enterprise: {
    layout: 'full-page-snap',
    container: 'full',
    headingSize: 'mega',
    animation: 'cinematic',
    contentDepth: 'enterprise',
    accentUsage: 'full-immersion',
    sections: 12
  }
};

const SECTION_POOL = [
  'hero:overlay', 'hero:split', 'hero:video', 'hero:kenburns', 'hero:showreel', 'hero:asymmetric', 'hero:minimal',
  'services:grid', 'services:hover', 'services:sticky', 'services:tabs', 'services:cards', 'services:accordion',
  'about:split', 'about:editorial', 'about:minimal', 'about:video',
  'gallery:masonry', 'gallery:horizontal', 'gallery:carousel', 'gallery:grid',
  'team:cards', 'team:mono', 'team:fullpage', 'team:filterable',
  'testimonials:carousel', 'testimonials:marquee', 'testimonials:editorial', 'testimonials:grid',
  'contact:simple', 'contact:split', 'contact:banner', 'contact:map',
  'pricing:cards', 'pricing:table', 'faq:accordion', 'stats:dark', 'stats:animated', 'blog:preview'
];

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateTable() {
  let md = `# FAZ 2: 200 TEMALIK FARKLILAŞTIRMA TABLOSU\n\n`;
  md += `Bu tablo, 40 sektör ve 5 plan seviyesi için (toplam 200 tema) 7 boyutta benzersiz yapıları tanımlar.\n\n`;

  const usedSectionOrders = new Set<string>();

  for (const sector of SECTORS) {
    md += `## Sektör: ${sector.toUpperCase()}\n`;
    md += `| Tema ID | Layout | Container | Görsel Dil | Tipografi (Header) | Animasyon | İçerik Derinliği | Renk Stratejisi | Section Sırası |\n`;
    md += `|---|---|---|---|---|---|---|---|---|\n`;

    const sectorFonts = new Set<string>();

    for (const plan of PLANS) {
      const id = `${sector}-${plan}`;
      const rules = PLAN_RULES[plan];
      
      // Visual Language
      const visLang = getRandomItem(VISUAL_LANGUAGES);
      
      // Font (ensure unique within sector)
      let hFont = getRandomItem(HEADING_FONTS);
      while(sectorFonts.has(hFont)) {
        hFont = getRandomItem(HEADING_FONTS);
      }
      sectorFonts.add(hFont);

      // Section Order (ensure globally unique)
      let sOrder = '';
      let isUniqueOrder = false;
      while(!isUniqueOrder) {
        const selectedSections = getRandomItems(SECTION_POOL, rules.sections);
        sOrder = selectedSections.join(' → ');
        if (!usedSectionOrders.has(sOrder)) {
          usedSectionOrders.add(sOrder);
          isUniqueOrder = true;
        }
      }

      // Formatting Row
      const layoutCol = `${rules.layout} (${rules.container})`;
      const typoCol = `${hFont} / ${rules.headingSize}`;
      const animCol = rules.animation;
      const contentCol = rules.contentDepth;
      const colorCol = rules.accentUsage;

      md += `| **${id}** | ${layoutCol} | ${rules.container} | ${visLang} | ${typoCol} | ${animCol} | ${contentCol} | ${colorCol} | ${sOrder} |\n`;
    }
    md += `\n`;
  }

  await fsPromises.writeFile('faz2_farklilastirma_tablosu.md', md, 'utf-8');
  console.log('Tablo faz2_farklilastirma_tablosu.md dosyasina kaydedildi!');
}

generateTable().catch(console.error);
