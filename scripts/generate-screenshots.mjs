import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script expects the Next.js server to be running locally at port 3000
const BASE_URL = 'http://localhost:3000';

function parseThemes(dirPath) {
  const themes = [];
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts') && !f.includes('demo') && !f.includes('font') && !f.includes('registry'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const blocks = content.split('id: ').slice(1);
    for (const block of blocks) {
      const idMatch = block.match(/^['"]([^'"]+)['"]/);
      const sectorMatch = block.match(/sectorId:\s*['"]([^'"]+)['"]/);
      if (idMatch && sectorMatch) {
        themes.push({ id: idMatch[1], sectorId: sectorMatch[1] });
      }
    }
  }
  return themes;
}

async function generateScreenshots() {
  const themesDir = path.join(__dirname, '../packages/templates/src/themes');
  const themes = parseThemes(themesDir);
  
  console.log(`Starting screenshot generation for ${themes.length} themes...`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a standard desktop size
  await page.setViewport({ width: 1280, height: 960 });

  for (const theme of themes) {
    const targetUrl = `${BASE_URL}/demolar/${theme.id}`;
    const outputDir = path.join(__dirname, `../public/templates/${theme.sectorId}`);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const thumbPath = path.join(outputDir, `${theme.id}-thumb.jpg`);
    const previewPath = path.join(outputDir, `${theme.id}-preview.jpg`);

    try {
      console.log(`Navigating to ${targetUrl}...`);
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Allow animations to settle
      await new Promise(r => setTimeout(r, 2000));
      
      // Thumbnail capture (400x300 aspect ratio scaled from 1280x960)
      await page.screenshot({ 
        path: thumbPath,
        clip: { x: 0, y: 0, width: 1280, height: 960 },
        quality: 85,
        type: 'jpeg'
      });
      
      // Full preview capture
      await page.screenshot({
        path: previewPath,
        fullPage: true,
        quality: 80,
        type: 'jpeg'
      });
      
      console.log(`✅ Screenshots saved for ${theme.id}`);
    } catch (err) {
      console.error(`❌ Failed to capture ${theme.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished capturing all screenshots.');
}

// To run:
// 1. Start the next.js app: npm run dev
// 2. npm i -D puppeteer (if not installed)
// 3. node scripts/generate-screenshots.mjs
generateScreenshots();
