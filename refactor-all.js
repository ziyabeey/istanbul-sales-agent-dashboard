const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// A robust pascal case converter: "kargo-dosya" -> "KargoDosya"
function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// 1. Process Section Components
const sectionsDir = path.resolve(__dirname, 'packages/templates/src/sections');
// Find all .tsx recursively
function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(sectionsDir);
const processedMap = {}; // KargoDosyaSections -> [chunks]

for (const file of allFiles) {
  if (file.includes('/global/') || file.includes('/common/') || file.includes('/header/') || file.includes('/footer/') || file.includes('/hero/')) {
    continue; // skip base components
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('registerSection')) {
    continue; // already correct
  }
  
  // Find component name
  const matchComp = content.match(/export\s+function\s+([A-Za-z0-9]+Sections)\s*\(/);
  if (!matchComp) continue;
  
  const compNameFull = matchComp[1]; // KargoDosyaSections
  const prefix = compNameFull.replace('Sections', '');
  
  // Extract chunks
  const blocks = [];
  let i = 0;
  let blockIndex = 1;
  while (i < content.length) {
    const match = content.slice(i).match(/{\/\*\s*\d+\.\s*(.*?)\s*\*\/}\s*<(section|header|footer)\b/i);
    if (!match) break;
    
    let title = "Section" + blockIndex;
    if (match[1]) title = match[1].trim();
    const tagName = match[2];
    const openTagIndex = i + match.index + match[0].length - `<${tagName}`.length;
    
    const closeTagPattern = new RegExp(`</${tagName}>`);
    const closeMatch = content.slice(openTagIndex).match(closeTagPattern);
    if (!closeMatch) break;
    
    const closeTagIndex = openTagIndex + closeMatch.index + `</${tagName}>`.length;
    const chunk = content.slice(openTagIndex, closeTagIndex);
    blocks.push({ type: tagName, title, chunk });
    i = closeTagIndex;
    blockIndex++;
  }
  
  if (blocks.length === 0) continue; // nothing found
  
  let newContent = `import { registerSection } from '../../registry/section-registry'\nimport { SectionProps } from '../../types/section-types'\n`;
  // Preserving ALL imports from top
  const importsMatch = content.match(/import.*?['"].*?['"]/gs);
  if (importsMatch) {
    newContent += importsMatch.filter(imp => !imp.includes('registry') && !imp.includes('section-types')).join('\n') + '\n\n';
  }

  const registers = [];
  const generatedConfigSections = [];
  
  blocks.forEach((b, idx) => {
    let type = 'section';
    const lower = b.title.toLowerCase();
    if (lower.includes('hero') || lower.includes('header')) type = 'hero';
    else if (lower.includes('footer')) type = 'footer';
    else if (lower.includes('service')) type = 'services';
    else if (lower.includes('gallery') || lower.includes('photo')) type = 'gallery';
    else if (lower.includes('about')) type = 'about';
    else if (lower.includes('stats') || lower.includes('proof')) type = 'stats';
    else if (lower.includes('contact') || lower.includes('booking')) type = 'contact';
    else type = 'services';

    const safeTitle = b.title.replace(/[^a-zA-Z]/g, '');
    const compName = `${prefix}${safeTitle}`;
    const variantStr = `${prefix.toLowerCase()}_${type}_${idx}`;
    
    let cleanChunk = b.chunk.replace(/bg-\[[^\]]+\]/g, '');
    cleanChunk = cleanChunk.replace(/text-\[[^\]]+\]/g, '');
    cleanChunk = cleanChunk.replace(/<(section|header|footer)([^>]*)>/, `<$1$2 style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>`);

    newContent += `export function ${compName}({ business }: SectionProps<any>) {\n`;
    newContent += `  const businessData = business;\n`;
    newContent += `  return (\n    ${cleanChunk}\n  )\n}\n\n`;
    
    registers.push(`registerSection('${type}', '${variantStr}', ${compName})`);
    
    generatedConfigSections.push({
      id: `sec_${idx}`,
      type: type,
      variant: variantStr,
      order: idx + 1
    });
  });
  
  newContent += registers.join('\n') + '\n';
  fs.writeFileSync(file, newContent);
  processedMap[prefix] = generatedConfigSections;
  console.log(`Refactored Component: ${compNameFull} -> ${blocks.length} sections`);
}

// 2. Update Configs
const configsDir = path.resolve(__dirname, 'packages/templates/src/themes/configs');
const configFiles = fs.readdirSync(configsDir).filter(f => f.endsWith('.ts'));

Object.keys(processedMap).forEach(prefix => {
  // prefix: "KargoDosya"
  // try to find matching config file. kargo-dosya-config.ts
  for (const cFile of configFiles) {
    const cPath = path.join(configsDir, cFile);
    const bareName = cFile.replace('-config.ts', ''); // kargo-dosya
    if (toPascalCase(bareName) === prefix) {
      let cContent = fs.readFileSync(cPath, 'utf8');
      
      const newSectionsJSON = processedMap[prefix].map(s => {
        return `{ id: '${s.id}', type: '${s.type}', variant: '${s.variant}', order: ${s.order}, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: ${s.order}, removable: true, animation: 'fadeUp' }, defaultContent: {}, editableFields: [] }`;
      }).join(',\n');
      
      cContent = cContent.replace(/sections:\s*\[[\s\S]*?\]\s*\n\s*\}\]/, `sections: [\n${newSectionsJSON}\n    ]\n  }]`);
      fs.writeFileSync(cPath, cContent);
      console.log(`Updated Config: ${cFile}`);
    }
  }
});

// 3. Update Client.tsx Demos
const demolarDir = path.resolve(__dirname, 'apps/web/src/app/demolar');
const demoFolders = fs.readdirSync(demolarDir);
for (const folder of demoFolders) {
  const clientPath = path.join(demolarDir, folder, 'client.tsx');
  if (fs.existsSync(clientPath)) {
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    if (clientContent.includes('<ThemeRenderer')) continue; // already using it
    
    clientContent = clientContent.replace(/import\s*{([^}]*)}\s*from\s*'@kepenk\/templates'/, (m, p1) => {
      let parts = p1.split(',').map(s=>s.trim()).filter(s=>s && !s.endsWith('Sections'));
      if(!parts.includes('ThemeRenderer')) parts.unshift('ThemeRenderer');
      return `import {\n  ${parts.join(',\n  ')}\n} from '@kepenk/templates'`;
    });
    
    clientContent = clientContent.replace(/<[A-Za-z]+Sections\s+config=\{.*?\}\s+businessData=\{.*?\}\s*\/>/g, 
        '<ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />');
        
    fs.writeFileSync(clientPath, clientContent);
    console.log(`Updated Client: ${folder}`);
  }
}
