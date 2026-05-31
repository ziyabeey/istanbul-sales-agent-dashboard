import fs from 'fs';
import path from 'path';

// Define the dimensions and their possible values
const DIMENSIONS = {
  layoutApproach: [
    'single-column', 'split-panels', 'asymmetric', 'editorial-zigzag', 
    'full-page-snap', 'dashboard-grid', 'horizontal-storytelling'
  ],
  containerWidth: ['sm', 'md', 'lg', 'xl', 'full'],
  visualLanguage: [
    'minimal-clean', 'vintage-warm', 'dark-neon', 'luxury-gold', 
    'industrial-bold', 'pastel-soft', 'editorial-magazine', 'brutalist-raw'
  ],
  headingSize: ['small', 'medium', 'large', 'xlarge', 'mega'],
  headingTransform: ['none', 'uppercase', 'italic', 'uppercase-spaced'],
  animationBudget: ['none', 'subtle', 'moderate', 'rich', 'cinematic'],
  colorStrategy: [
    'monochrome-accent', 'duotone', 'gradient-rich', 'dark-with-glow', 
    'pastel-harmony', 'earth-tones', 'high-contrast'
  ]
};

// Also we need distinct fonts per theme in a sector
const FONTS = [
  'Inter', 'Playfair Display', 'Syne', 'Cormorant Garamond', 'Montserrat', 
  'Oswald', 'DM Sans', 'Space Grotesk', 'Outfit', 'Cinzel'
];

interface ThemeDifferentiationSpec {
  id: string;
  sectorId: string;
  plan: string;

  layoutApproach: string;
  containerWidth: string;
  visualLanguage: string;
  
  headingSize: string;
  headingTransform: string;
  headingFont: string;
  
  animationBudget: string;
  colorStrategy: string;
}

// Simple parsing instead of TS import to avoid alias/build issues
function parseThemes(dirPath: string) {
  const themes: {id: string, sectorId: string, plan: string}[] = [];
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts') && !f.includes('demo') && !f.includes('font') && !f.includes('registry'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const blocks = content.split('id: ').slice(1);
    for (const block of blocks) {
      const idMatch = block.match(/^['"]([^'"]+)['"]/);
      const sectorMatch = block.match(/sectorId:\s*['"]([^'"]+)['"]/);
      const planMatch = block.match(/plan:\s*['"]([^'"]+)['"]/);
      
      if (idMatch && sectorMatch && planMatch) {
        themes.push({
          id: idMatch[1],
          sectorId: sectorMatch[1],
          plan: planMatch[1]
        });
      }
    }
  }
  return themes;
}

function calculateDifference(t1: any, t2: any): number {
  let diffCount = 0;
  if (t1.layoutApproach !== t2.layoutApproach) diffCount++;
  if (t1.containerWidth !== t2.containerWidth) diffCount++;
  if (t1.visualLanguage !== t2.visualLanguage) diffCount++;
  if (t1.headingSize !== t2.headingSize) diffCount++;
  if (t1.headingTransform !== t2.headingTransform) diffCount++;
  if (t1.animationBudget !== t2.animationBudget) diffCount++;
  if (t1.colorStrategy !== t2.colorStrategy) diffCount++;
  return diffCount;
}

function generateSpecs() {
  const dirPath = path.join(__dirname, '../packages/templates/src/themes');
  const themes = parseThemes(dirPath);
  
  // Group by sector
  const sectors = new Map<string, typeof themes>();
  for (const t of themes) {
    if (!sectors.has(t.sectorId)) sectors.set(t.sectorId, []);
    sectors.get(t.sectorId)!.push(t);
  }

  const allSpecs: ThemeDifferentiationSpec[] = [];

  for (const [sectorId, sectorThemes] of sectors.entries()) {
    const sectorSpecs: ThemeDifferentiationSpec[] = [];
    const usedFonts = new Set<string>();

    for (let i = 0; i < sectorThemes.length; i++) {
        const theme = sectorThemes[i];
        
        // Find a valid combination
        let spec: any = {};
        let attempts = 0;
        let valid = false;
        
        while (!valid && attempts < 1000) {
            attempts++;
            spec = {
                id: theme.id,
                sectorId: theme.sectorId,
                plan: theme.plan,
                layoutApproach: DIMENSIONS.layoutApproach[Math.floor(Math.random() * DIMENSIONS.layoutApproach.length)],
                containerWidth: DIMENSIONS.containerWidth[Math.floor(Math.random() * DIMENSIONS.containerWidth.length)],
                visualLanguage: DIMENSIONS.visualLanguage[Math.floor(Math.random() * DIMENSIONS.visualLanguage.length)],
                headingSize: DIMENSIONS.headingSize[Math.floor(Math.random() * DIMENSIONS.headingSize.length)],
                headingTransform: DIMENSIONS.headingTransform[Math.floor(Math.random() * DIMENSIONS.headingTransform.length)],
                animationBudget: DIMENSIONS.animationBudget[Math.floor(Math.random() * DIMENSIONS.animationBudget.length)],
                colorStrategy: DIMENSIONS.colorStrategy[Math.floor(Math.random() * DIMENSIONS.colorStrategy.length)],
            };

            // Check against previous specs in this sector
            valid = true;
            for (const existing of sectorSpecs) {
                if (calculateDifference(spec, existing) < 4) {
                    valid = false;
                    break;
                }
            }
            
            // For the specific tiers, we can try to force certain things if we want, but random with diff >= 4 is enough for now.
        }
        
        // Pick a unique font
        const availableFonts = FONTS.filter(f => !usedFonts.has(f));
        spec.headingFont = availableFonts.length > 0 ? availableFonts[Math.floor(Math.random() * availableFonts.length)] : FONTS[Math.floor(Math.random() * FONTS.length)];
        usedFonts.add(spec.headingFont);

        sectorSpecs.push(spec as ThemeDifferentiationSpec);
        allSpecs.push(spec as ThemeDifferentiationSpec);
    }
  }

  const outputPath = path.join(__dirname, '../theme_differentiation_specs.json');
  fs.writeFileSync(outputPath, JSON.stringify(allSpecs, null, 2));
  console.log(`Generated specs for ${allSpecs.length} themes across ${sectors.size} sectors.`);
}

generateSpecs();
