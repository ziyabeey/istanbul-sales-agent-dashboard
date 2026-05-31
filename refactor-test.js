const fs = require('fs');
const path = require('path');

const fileP = path.resolve(__dirname, 'packages/templates/src/sections/kargo/KargoDosyaSections.tsx');
let content = fs.readFileSync(fileP, 'utf8');

// Find all HTML blocks
function extractBlocks(text) {
  const blocks = [];
  let i = 0;
  let blockIndex = 1;
  while (i < text.length) {
    const match = text.slice(i).match(/{\/\*\s*\d+\.\s*(.*?)\s*\*\/}\s*<(section|header|footer)\b/i);
    if (!match) break;
    
    const commentMatch = text.slice(i, i + match.index).match(/{\/\*\s*\d+\.\s*(.*?)\s*\*\/}/);
    let title = "Section" + blockIndex;
    if (match[1]) title = match[1].trim();

    const tagName = match[2];
    const openTagIndex = i + match.index + match[0].length - `<${tagName}`.length;
    
    const closeTagPattern = new RegExp(`</${tagName}>`);
    const closeMatch = text.slice(openTagIndex).match(closeTagPattern);
    if (!closeMatch) break;
    
    const closeTagIndex = openTagIndex + closeMatch.index + `</${tagName}>`.length;
    
    let chunk = text.slice(openTagIndex, closeTagIndex);
    
    blocks.push({ type: tagName, title, chunk });
    i = closeTagIndex;
    blockIndex++;
  }
  return blocks;
}

const blocks = extractBlocks(content);
const prefix = "KargoDosya";

let newContent = `import { registerSection } from '../../registry/section-registry'\nimport { SectionProps } from '../../types/section-types'\nimport { FileStack, MapPin, Clock, ShieldCheck, MailSearch } from 'lucide-react'\n\n`;

const registers = [];

blocks.forEach((b, idx) => {
  // mapping title to a type
  const lower = b.title.toLowerCase();
  let type = 'section';
  if (lower.includes('hero') || lower.includes('header')) type = 'hero';
  else if (lower.includes('footer')) type = 'footer';
  else if (lower.includes('service')) type = 'services';
  else if (lower.includes('gallery') || lower.includes('photo')) type = 'gallery';
  else type = 'services'; // fallback

  const compName = `${prefix}${b.title.replace(/[^a-zA-Z]/g, '')}`;
  const variantStr = `${prefix.toLowerCase()}_${type}`;
  
  // replace bg-[#...] with CSS var
  let cleanChunk = b.chunk.replace(/bg-\[[^\]]+\]/g, '');
  cleanChunk = cleanChunk.replace(/text-\[[^\]]+\]/g, '');
  
  // Insert style tag to outermost
  cleanChunk = cleanChunk.replace(/<(section|header|footer)([^>]*)>/, `<$1$2 style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>`);

  newContent += `export function ${compName}({ business }: SectionProps<any>) {\n`;
  newContent += `  const businessData = business;\n`;
  newContent += `  return (\n    ${cleanChunk}\n  )\n}\n\n`;
  
  registers.push(`registerSection('${type}', '${variantStr}_${idx}', ${compName})`);
});

newContent += registers.join('\n') + '\n';
fs.writeFileSync('/tmp/KargoDosyaSections-refactored.tsx', newContent);
console.log('Success! Saved to /tmp/KargoDosyaSections-refactored.tsx');
