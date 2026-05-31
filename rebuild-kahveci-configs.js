const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, 'packages/templates/src/themes/configs');
const files = fs.readdirSync(configDir).filter(f => f.startsWith('kahveci-') && f.endsWith('-config.ts'));

files.forEach(file => {
  const filePath = path.join(configDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // e.g. kahveci-3nesil -> 3nesil
  const variantChunk = file.replace('kahveci-', '').replace('-config.ts', '');
  // Because we named them '3nesil', 'brunch', 'kavurma', 'lux', 'turk'
  // and the prefix is 'kahveci_'
  const variantName = variantChunk.replace('-', '_');

  const newSections = `[
    { id: 'hero', type: 'hero', variant: 'kahveci_${variantName}_hero', order: 1, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'about', type: 'about', variant: 'kahveci_${variantName}_about', order: 2, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'services', type: 'services', variant: 'kahveci_${variantName}_services', order: 3, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'gallery', type: 'gallery', variant: 'kahveci_${variantName}_gallery', order: 4, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'testimonials', type: 'testimonials', variant: 'kahveci_${variantName}_testimonials', order: 5, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'contact', type: 'contact', variant: 'kahveci_${variantName}_contact', order: 6, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'team', type: 'team', variant: 'kahveci_${variantName}_team', order: 7, required: false, settings: { visible: false }, defaultContent: {} },
    { id: 'faq', type: 'faq', variant: 'kahveci_${variantName}_faq', order: 8, required: false, settings: { visible: false }, defaultContent: {} },
    { id: 'blog_preview', type: 'blog_preview', variant: 'kahveci_${variantName}_blog_preview', order: 9, required: false, settings: { visible: false }, defaultContent: {} },
    { id: 'header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, settings: { visible: true }, defaultContent: {} },
    { id: 'footer', type: 'footer', variant: 'minimal', order: 99, required: true, settings: { visible: true }, defaultContent: {} }
  ]`;

  // We find 'sections: [ ... ] }] }' and replace it safely
  content = content.replace(/sections:\s*\[.*\]\s*\}\s*\]\s*\}/g, `sections: ${newSections} }] }`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Rebuilt sections for ${file}`);
});
