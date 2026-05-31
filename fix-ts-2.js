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
  
  // Fix easing string error for framer-motion Variants typing
  content = content.replace(/ease:\s*(['"])easeOut\1/g, "ease: $1easeOut$1 as const");
  
  // Fix settings?.buttonText or settings?.ctaText which are not in SectionSettings
  // Replace settings?.buttonText with (settings as any)?.buttonText
  content = content.replace(/settings\?\.buttonText/g, "(settings as any)?.buttonText");
  content = content.replace(/s\?\.buttonText/g, "(s as any)?.buttonText");
  
  fs.writeFileSync(file, content);
}
console.log('Fixed additional TS errors in files.');
