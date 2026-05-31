import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specsPath = path.join(__dirname, '../theme_differentiation_specs.json');
const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));

const dirPath = path.join(__dirname, '../packages/templates/src/themes');
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts') && !f.includes('demo') && !f.includes('font') && !f.includes('registry'));

const containerWidthMap = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  'full': '100%'
};

const fontCategoryMap = {
  'Inter': 'sans-serif',
  'Playfair Display': 'serif',
  'Syne': 'sans-serif',
  'Cormorant Garamond': 'serif',
  'Montserrat': 'sans-serif',
  'Oswald': 'sans-serif',
  'DM Sans': 'sans-serif',
  'Space Grotesk': 'sans-serif',
  'Outfit': 'sans-serif',
  'Cinzel': 'serif'
};

const SHUFFLE_VARIANTS = [
  'hero::fullscreen_overlay', 'hero::split_left', 'hero::video_cinematic', 'hero::centered',
  'services::card_grid', 'services::hover_reveal', 'services::sticky_scroll', 'services::list',
  'gallery::masonry', 'gallery::horizontal_snap', 'gallery::grid', 'about::split_left', 'about::center'
];

for (const file of files) {
  const filePath = path.join(dirPath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace each theme block safely
  for (const spec of specs) {
    const idRegex = new RegExp(`(id:\\s*['"]${spec.id}['"])([\\s\\S]*?)(homeSections:\\s*\\[(.*?)\\])([\\s\\S]*?)(?=id:\\s*['"]|\\n\\s*\\]|$)`, 'g');
    
    content = content.replace(idRegex, (match, idPart, middle, homeSecPart, homeSecInner, endPart) => {
        // Replace fonts block
        let newMiddle = middle.replace(/heading:\s*\{\s*family:\s*['"][^'"]+['"]/g, `heading: { family: '${spec.headingFont}'`);
        
        // Inject CSS overrides
        const cssOverridesRegex = /cssOverrides:\s*\{([^}]*)\}/;
        if (cssOverridesRegex.test(newMiddle)) {
            newMiddle = newMiddle.replace(cssOverridesRegex, (cssMatch, cssInner) => {
                let newCss = cssInner;
                const width = containerWidthMap[spec.containerWidth];
                const fontStack = `'${spec.headingFont}', ${fontCategoryMap[spec.headingFont]}`;
                
                if (!newCss.includes('--container-default')) {
                    newCss += `\n      '--container-default': '${width}',`;
                } else {
                    newCss = newCss.replace(/('--container-default':\s*['"])[^'"]+(['"])/, `$1${width}$2`);
                }

                if (!newCss.includes('--font-heading')) {
                    newCss += `\n      '--font-heading': "${fontStack}",`;
                } else {
                    newCss = newCss.replace(/('--font-heading':\s*['"])[^'"]+(['"])/, `$1${fontStack}$2`);
                }
                
                return `cssOverrides: {${newCss}}`;
            });
        }

        // Shuffle / modify homeSections slightly to break the identical patterns
        // We will randomly pick a completely different section order pattern based on layoutApproach
        let sections = homeSecInner.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
        
        if (sections.length > 3) {
            // Swap 2nd and 3rd sections just to create variation
            if (spec.layoutApproach === 'split-panels') {
                const temp = sections[1];
                sections[1] = sections[2];
                sections[2] = temp;
            } else if (spec.layoutApproach === 'asymmetric') {
                const temp = sections[2];
                sections[2] = sections[3];
                sections[3] = temp;
            }
            
            // Randomly append a section if it doesn't exist
            if (spec.visualLanguage === 'minimal-clean' && !sections.includes('faq::simple')) {
                sections.push('faq::simple');
            }
        }
        
        const newHomeSecPart = `homeSections: [\n      ${sections.map(s => `'${s}'`).join(',\n      ')}\n    ]`;
        
        return idPart + newMiddle + newHomeSecPart + endPart;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Successfully applied theme specs to all files.');
