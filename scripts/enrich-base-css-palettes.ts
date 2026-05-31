import * as fs from 'fs';
import * as path from 'path';

// Palette definitions for different "Vibes"
interface Palette {
  bg: string;
  surface: string;
  surfaceElevated: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  radiusMd: string;
  radiusLg: string;
  containerWidth: string;
  sectionPy: string;
}

const PALETTES: Record<string, Palette> = {
  clean: {
    bg: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    radiusMd: '6px',
    radiusLg: '12px',
    containerWidth: '1024px',
    sectionPy: '64px'
  },
  modern: {
    bg: '#FCFCFD',
    surface: '#F1F3F5',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#E9ECEF',
    text: '#212529',
    textSecondary: '#495057',
    textMuted: '#868E96',
    border: '#DEE2E6',
    borderSubtle: '#F1F3F5',
    radiusMd: '8px',
    radiusLg: '16px',
    containerWidth: '1120px',
    sectionPy: '80px'
  },
  luxuryLight: {
    bg: '#FAFAF9',
    surface: '#F5F5F4',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#E7E5E4',
    text: '#1C1917',
    textSecondary: '#57534E',
    textMuted: '#A8A29E',
    border: '#D6D3D1',
    borderSubtle: '#E7E5E4',
    radiusMd: '2px', // Sharper edges for luxury
    radiusLg: '4px',
    containerWidth: '1200px',
    sectionPy: '96px'
  },
  luxuryDark: {
    bg: '#1C1917',
    surface: '#292524',
    surfaceElevated: '#44403C',
    surfaceMuted: '#171717',
    text: '#FAFAF9',
    textSecondary: '#D6D3D1',
    textMuted: '#78716C',
    border: '#57534E',
    borderSubtle: '#44403C',
    radiusMd: '2px',
    radiusLg: '4px',
    containerWidth: '1200px',
    sectionPy: '96px'
  },
  darkAggressive: {
    bg: '#0F172A',
    surface: '#1E293B',
    surfaceElevated: '#334155',
    surfaceMuted: '#0B1120',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#475569',
    border: '#334155',
    borderSubtle: '#1E293B',
    radiusMd: '0px', // Very sharp
    radiusLg: '0px',
    containerWidth: '1024px',
    sectionPy: '64px'
  },
  earthy: {
    bg: '#FDFBF7',
    surface: '#F4F1EA',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#E8E4D9',
    text: '#3D3831',
    textSecondary: '#6B6356',
    textMuted: '#B3AAA0',
    border: '#DED8CE',
    borderSubtle: '#F4F1EA',
    radiusMd: '12px',
    radiusLg: '24px',
    containerWidth: '1024px',
    sectionPy: '72px'
  },
  playful: {
    bg: '#FFFAFA',
    surface: '#FFF0F0',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#FFE4E4',
    text: '#4A3B3B',
    textSecondary: '#7A6B6B',
    textMuted: '#B3A1A1',
    border: '#FFD6D6',
    borderSubtle: '#FFF0F0',
    radiusMd: '16px',
    radiusLg: '32px',
    containerWidth: '960px',
    sectionPy: '64px'
  }
};

// Keyword mapping logic
function determinePalette(id: string): Palette {
  const parts = id.split('-');
  const suffix = parts[parts.length - 1]; // e.g. 'sade', 'lux', 'blade'
  const prefix = parts[0]; // e.g. 'berber', 'asansor'

  // Exceptions indicating Dark themes natively
  const darkThemeKeywords = ['blade', 'gece', 'acil', 'endustriyel'];
  if (darkThemeKeywords.includes(suffix)) return PALETTES.darkAggressive;

  // Luxury / Premium check
  const luxuryKeywords = ['lux', 'elite', 'vip', 'prestige', 'premium', 'fine', 'studio'];
  if (luxuryKeywords.includes(suffix)) {
    // Some luxury themes are better dark
    if (['studio', 'vip'].includes(suffix)) return PALETTES.luxuryDark;
    return PALETTES.luxuryLight;
  }

  // Modern / Tech
  const modernKeywords = ['modern', 'dinamik', 'hizli', 'smart', 'express', 'moto'];
  if (modernKeywords.includes(suffix)) return PALETTES.modern;

  // Earthy / Organic
  const earthyKeywords = ['organik', 'doga', 'bitkisel', 'ahsap', 'vegan'];
  if (earthyKeywords.includes(suffix)) return PALETTES.earthy;

  // Playful / Soft
  const playfulKeywords = ['cocuk', 'oyun', 'sanat', 'parti', 'petshop'];
  if (playfulKeywords.includes(suffix)) return PALETTES.playful;

  // Default to Clean
  return PALETTES.clean;
}

const CONFIG_DIR = path.join(__dirname, '../packages/templates/src/themes/configs');

function processAll() {
  const files = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.ts'));
  let updatedCount = 0;

  for (const file of files) {
    const p = path.join(CONFIG_DIR, file);
    let content = fs.readFileSync(p, 'utf-8');

    // Extract theme id from filename
    // e.g. 'berber-sade-config.ts' -> 'berber-sade'
    const themeId = file.replace('-config.ts', '');
    const palette = determinePalette(themeId);

    // Apply palette replacements
    const replaceMap: Record<string, keyof Palette> = {
      "'--color-bg'": "bg",
      "'--color-surface'": "surface",
      "'--color-surface-elevated'": "surfaceElevated",
      "'--color-surface-muted'": "surfaceMuted",
      "'--color-text'": "text",
      "'--color-text-secondary'": "textSecondary",
      "'--color-text-muted'": "textMuted",
      "'--color-border'": "border",
      "'--color-border-subtle'": "borderSubtle",
      "'--radius-md'": "radiusMd",
      "'--radius-lg'": "radiusLg",
      "'--container-default'": "containerWidth",
      "'--section-py'": "sectionPy"
    };

    let modified = false;
    
    // We only want to replace inside the _CSS object block to avoid touching anything else
    for (const [key, propName] of Object.entries(replaceMap)) {
      // Regex finds the key in a CSS dictionary, e.g.   '--color-bg': '#FFFFFF',
      const regex = new RegExp(`(${key}:\\s*)'[^']+'`, 'g');
      const replacementValue = palette[propName];
      
      const newContent = content.replace(regex, `$1'${replacementValue}'`);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(p, content, 'utf-8');
      updatedCount++;
    }
  }

  console.log(`Updated CSS palettes for ${updatedCount} config files.`);
}

processAll();
