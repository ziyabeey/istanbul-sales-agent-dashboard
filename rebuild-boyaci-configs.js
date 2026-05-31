const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, 'packages/templates/src/themes/configs');
const files = fs.readdirSync(configDir).filter(f => f.startsWith('boyaci-') && f.endsWith('-config.ts'));

files.forEach(file => {
  const filePath = path.join(configDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // e.g. boyaci-dekoratif -> dekoratif
  const variantChunk = file.replace('boyaci-', '').replace('-config.ts', '');
  const variantName = variantChunk.replace('-', '_');

  const baseSettings = `{ bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }`;

  const newSections = `[
    { id: 'hero', type: 'hero', variant: 'boyaci_${variantName}_hero', order: 1, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'about', type: 'about', variant: 'boyaci_${variantName}_about', order: 2, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'services', type: 'services', variant: 'boyaci_${variantName}_services', order: 3, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'gallery', type: 'gallery', variant: 'boyaci_${variantName}_gallery', order: 4, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'testimonials', type: 'testimonials', variant: 'boyaci_${variantName}_testimonials', order: 5, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'contact', type: 'contact', variant: 'boyaci_${variantName}_contact', order: 6, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'team', type: 'team', variant: 'boyaci_${variantName}_team', order: 7, required: false, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'faq', type: 'faq', variant: 'boyaci_${variantName}_faq', order: 8, required: false, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'blog_preview', type: 'blog_preview', variant: 'boyaci_${variantName}_blog_preview', order: 9, required: false, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] },
    { id: 'footer', type: 'footer', variant: 'minimal', order: 99, required: true, settings: ${baseSettings}, defaultContent: {}, editableFields: [] }
  ]`;

  content = content.replace(/sections:\s*\[[\s\S]*\]\s*\}\s*\]\s*\}/g, `sections: ${newSections} }] }`);
  
  if (!content.includes('subsets')) {
    content = content.replace(/weights:\s*\[([^\]]+)\]/g, 'weights: [$1], subsets: ["latin", "latin-ext"]');
  }

  content = content.replace(/plan:\s*'elite'/g, "plan: 'enterprise'");

  if (!content.includes('designPhilosophy:')) {
    content = content.replace(/isDark: (true|false),/g, `isDark: $1, description: "Awwwards-level demo template for painters.", designPhilosophy: "Bespoke, dynamic, and emotionally intelligent aesthetics.", seoSchemaType: "Painter", sectorSections: [], performanceBudget: { maxJS: "150kb", maxLCP: "2.5s", animationLevel: "framer-full" },`);
  }

  if (!content.includes('titleTr:')) {
    content = content.replace(/title:\s*([^,]+),/g, 'title: $1, titleTr: $1,');
  }

  if (!content.includes('ownerName:')) {
    content = content.replace(/: BusinessData = \{/g, ': BusinessData = { ownerName: "Demo Boyacı", phoneClean: "08501112233", city: "İstanbul", district: "Kadıköy", workingHours: [], socialMedia: {}, photos: [],');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Rebuilt AST configs for ${file}`);
});
