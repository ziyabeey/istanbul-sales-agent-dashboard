const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, 'packages/templates/src/themes/configs');
const files = fs.readdirSync(configDir).filter(f => f.startsWith('cicekci-') && f.endsWith('-config.ts'));

files.forEach(file => {
  const filePath = path.join(configDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix ThemeConfig missing root properties
  if (!content.includes('designPhilosophy:')) {
    content = content.replace(/isDark: (true|false),/g, `isDark: $1, description: "Awwwards-level demo template for florists.", designPhilosophy: "Bespoke, dynamic, and emotionally intelligent aesthetics.", seoSchemaType: "Florist", sectorSections: [], performanceBudget: { maxJS: "150kb", maxLCP: "2.5s", animationLevel: "framer-full" },`);
  }

  // Double check that titleTr and ownerName are also safely fixed (from previous run)
  if (!content.includes('titleTr:')) {
    content = content.replace(/title:\s*([^,]+),/g, 'title: $1, titleTr: $1,');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fully fortified TS for ${file}`);
});
