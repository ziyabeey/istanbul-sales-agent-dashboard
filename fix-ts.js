const fs = require('fs');
const files = [
  'packages/templates/src/sections/oto/OtoBakimSections.tsx',
  'packages/templates/src/sections/oto/OtoDetaySections.tsx',
  'packages/templates/src/sections/oto/OtoDinamikSections.tsx',
  'packages/templates/src/sections/oto/OtoEksperSections.tsx',
  'packages/templates/src/sections/oto/OtoElektrikSections.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix missing exports
  content = content.replace(/^function Oto/gm, 'export function Oto');
  
  // Fix easing string error for framer-motion
  content = content.replace(/ease:\s*(['"])out\1/g, "ease: $1easeOut$1");
  
  // Fix ctaText property access if it was mistakenly used as s?.ctaText
  content = content.replace(/s\?\.ctaText/g, 's?.buttonText');
  
  fs.writeFileSync(file, content);
}
console.log('Fixed TS errors in files.');
