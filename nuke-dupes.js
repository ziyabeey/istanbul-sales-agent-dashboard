const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, 'packages/templates/src/themes/configs');
const files = fs.readdirSync(configDir).filter(f => f.startsWith('boyaci-') && f.endsWith('-config.ts'));

files.forEach(file => {
  const filePath = path.join(configDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/description:\s*'[^']+',\r?\n\s*isDark:/g, 'isDark:');
  content = content.replace(/seoSchemaType:\s*'[^']+',\r?\n\s*globalSections:/g, 'globalSections:');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Nuked dupes in ${file}`);
});
