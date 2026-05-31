const fs = require('fs');
const path = require('path');

const demolarDir = path.resolve(__dirname, 'apps/web/src/app/demolar');

function fixImports(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('@kepenk/templates/src/')) {
        content = content.replace(/'@kepenk\/templates\/src\/[^']+'/g, "'@kepenk/templates'");
        fs.writeFileSync(fullPath, content);
        console.log('Fixed imports in', fullPath);
      }
    }
  }
}

fixImports(demolarDir);
console.log('Done');
