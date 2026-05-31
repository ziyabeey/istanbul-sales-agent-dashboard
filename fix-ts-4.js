const fs = require('fs');

const files = [
  'packages/templates/src/sections/oto/OtoFiloSections.tsx',
  'packages/templates/src/sections/oto/OtoGuvenSections.tsx',
  'packages/templates/src/sections/oto/OtoHizliSections.tsx',
  'packages/templates/src/sections/oto/OtoKaportaSections.tsx',
  'packages/templates/src/sections/oto/OtoLastikSections.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Revert double typings caused by fix-ts-3.js
  content = content.replace(/: any: any/g, ": any");
  content = content.replace(/: number: number/g, ": number");
  
  // Also if there was a case where `$1: any` was applied on top of `item: any`
  content = content.replace(/\(item: any\): any/g, "(item: any)");
  content = content.replace(/\(s: any\): any/g, "(s: any)");
  content = content.replace(/\(idx: any\): any/g, "(idx: any)");
  content = content.replace(/\(it: any\): any/g, "(it: any)");

  fs.writeFileSync(file, content);
}
console.log('Reverted double typings.');
