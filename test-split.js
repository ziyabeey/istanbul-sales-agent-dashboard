const fs = require('fs');
const path = require('path');

// Simple parser for JSX that tracks tag nesting
function splitSections(jsxContent) {
  const blocks = [];
  let i = 0;
  
  while (i < jsxContent.length) {
    // find next top-level <section, <header, or <footer
    const match = jsxContent.slice(i).match(/<(section|header|footer)\b/);
    if (!match) break;
    
    const tagName = match[1];
    const openTagIndex = i + match.index;
    
    // find the matching closing tag </section>, </header>, or </footer>
    // assuming no nested tags of the SAME type
    const closeTagPattern = new RegExp(`</${tagName}>`);
    const closeMatch = jsxContent.slice(openTagIndex).match(closeTagPattern);
    if (!closeMatch) {
      console.warn(`Unmatched close tag for ${tagName}`);
      break;
    }
    
    const closeTagIndex = openTagIndex + closeMatch.index + `</${tagName}>`.length;
    
    const chunk = jsxContent.slice(openTagIndex, closeTagIndex);
    blocks.push({ type: tagName, content: chunk });
    
    i = closeTagIndex;
  }
  
  return blocks;
}

const testFile = path.resolve(__dirname, 'packages/templates/src/sections/kargo/KargoDosyaSections.tsx');
try {
  const fileContent = fs.readFileSync(testFile, 'utf8');
  const sections = splitSections(fileContent);
  console.log(`Found ${sections.length} blocks in KargoDosyaSections.tsx:`);
  sections.forEach((s, idx) => {
     console.log(`Block ${idx + 1}: <${s.type}> ... </${s.type}> (length: ${s.content.length})`);
  });
} catch (e) {
  console.error(e);
}
