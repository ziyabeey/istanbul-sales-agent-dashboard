const fs = require('fs');

const path = 'packages/templates/src/themes/extended-sector-themes.ts';
let content = fs.readFileSync(path, 'utf-8');

const lines = content.split('\n');
let newLines = [];
let insideObject = false;
let currentObjectLines = [];
let isClone = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Object starts with '  {' and ends with '  },' or '  }'
  if (line.match(/^  \{$/)) {
    if (!insideObject) {
      insideObject = true;
      currentObjectLines.push(line);
      continue;
    }
  }
  
  if (insideObject) {
    currentObjectLines.push(line);
    if (line.includes('awwwards_dynamic_hero')) {
      isClone = true;
    }
    
    // detect end of object
    if (line.match(/^  \},?$/)) {
      if (!isClone) {
        newLines.push(...currentObjectLines);
      }
      insideObject = false;
      currentObjectLines = [];
      isClone = false;
    }
  } else {
    newLines.push(line);
  }
}

fs.writeFileSync(path, newLines.join('\n'));
console.log('Clones removed.');
