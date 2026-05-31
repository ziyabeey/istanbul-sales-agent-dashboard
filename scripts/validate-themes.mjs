import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseThemes(dirPath) {
  const themes = [];
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts') && !f.includes('demo') && !f.includes('font') && !f.includes('registry'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const blocks = content.split('id: ').slice(1);
    for (const block of blocks) {
      const idMatch = block.match(/^['"]([^'"]+)['"]/);
      const sectorMatch = block.match(/sectorId:\s*['"]([^'"]+)['"]/);
      const planMatch = block.match(/plan:\s*['"]([^'"]+)['"]/);
      
      const sectionsMatch = block.match(/homeSections:\s*\[([\s\S]*?)\]/);
      const sections = sectionsMatch ? sectionsMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : [];
      
      const cssMatch = block.match(/cssOverrides:\s*\{([\s\S]*?)\}/);
      const cssStr = cssMatch ? cssMatch[1] : '';
      
      let containerMatch = cssStr.match(/--container-default':\s*['"]([^'"]+)['"]/);
      let headingFontMatch = cssStr.match(/--font-heading':\s*['"]([^'"]+)['"]/);
      let accentMatch = cssStr.match(/--color-accent':\s*['"]([^'"]+)['"]/);

      if (idMatch && sectorMatch) {
        themes.push({
          id: idMatch[1],
          sectorId: sectorMatch[1],
          plan: planMatch ? planMatch[1] : '',
          sections: sections.join(' -> '),
          container: containerMatch ? containerMatch[1] : '',
          headingFont: headingFontMatch ? headingFontMatch[1].split(',')[0].replace(/['"]/g, '').trim() : '',
          accent: accentMatch ? accentMatch[1] : ''
        });
      }
    }
  }
  return themes;
}

function runValidation() {
  const themesDir = path.join(__dirname, '../packages/templates/src/themes');
  const themes = parseThemes(themesDir);
  const issues = [];
  
  // Group by sector
  const sectors = new Map();
  for (const t of themes) {
    if (!sectors.has(t.sectorId)) sectors.set(t.sectorId, []);
    sectors.get(t.sectorId).push(t);
  }

  for (const [sectorId, sectorThemes] of sectors.entries()) {
    
    // 1. Section Order Uniqueness
    for (let i = 0; i<sectorThemes.length; i++) {
        for (let j = i+1; j<sectorThemes.length; j++) {
            if (sectorThemes[i].sections === sectorThemes[j].sections) {
                issues.push(`[${sectorId}] Ayn\u0131 section s\u0131ras\u0131: ${sectorThemes[i].id} === ${sectorThemes[j].id}`);
            }
        }
    }
    
    // 2. Font Uniqueness (Same Sector)
    const fontUsage = new Map();
    for (const theme of sectorThemes) {
        if (!theme.headingFont) continue;
        if (!fontUsage.has(theme.headingFont)) {
            fontUsage.set(theme.headingFont, []);
        }
        fontUsage.get(theme.headingFont).push(theme.id);
    }
    for (const [font, ids] of fontUsage.entries()) {
        if (ids.length > 1) {
            issues.push(`[${sectorId}] Ayn\u0131 heading fontu (${font}) birden fazla kullan\u0131lm\u0131\u015f: ${ids.join(', ')}`);
        }
    }

    // 3. Layout Diversity
    const containers = Array.from(new Set(sectorThemes.map(t => t.container).filter(Boolean)));
    if (containers.length < Math.min(3, sectorThemes.length)) {
        issues.push(`[${sectorId}] Yetersiz layout \u00e7e\u015fitlili\u011fi: Sadece ${containers.length} farkl\u0131 width kullan\u0131lm\u0131\u015f.`);
    }
  }

  if (issues.length === 0) {
      console.log('TÜM TEMALAR BAŞARIYLA DOĞRULANDI! 🎉 Benzersizlik kurallarına uygun.');
  } else {
      console.log(`❌ TOPLAM ${issues.length} BENZERSİZLİK SORUNU TESPİT EDİLDİ:\n`);
      for (let issue of issues.slice(0, 50)) {
          console.log(issue);
      }
      if (issues.length > 50) {
          console.log(`...ve ${issues.length - 50} sorun daha.`);
      }
  }
}

runValidation();
