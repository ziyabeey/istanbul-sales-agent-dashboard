const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, 'packages/templates/src/themes/configs');
const files = fs.readdirSync(configDir).filter(f => f.startsWith('guzellik-') && f.endsWith('-config.ts'));

files.forEach(file => {
  const filePath = path.join(configDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const variantName = file.replace('-config.ts', '').replace('-', '_'); // e.g. guzellik_atelier
  
  // Replace: type: 'hero', variant: 'fullscreen_overlay'
  // With: type: 'hero', variant: 'guzellik_atelier_hero'
  content = content.replace(/type:\s*'([^']+)',\s*variant:\s*'([^']+)'/g, (match, p1, p2) => {
    // Keep header, footer, whatsapp, cookie as they are because they are global and not sector specific!
    if (['header', 'footer', 'whatsapp_cta', 'cookie_banner'].includes(p1)) {
       return match;
    }
    return `type: '${p1}', variant: '${variantName}_${p1}'`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated variants in ${file}`);
});
