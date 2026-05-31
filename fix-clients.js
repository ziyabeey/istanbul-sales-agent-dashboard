const fs = require('fs');
const path = require('path');

const demolarDir = path.resolve(__dirname, 'apps/web/src/app/demolar');
const demoFolders = fs.readdirSync(demolarDir);

for (const folder of demoFolders) {
  const clientPath = path.join(demolarDir, folder, 'client.tsx');
  if (fs.existsSync(clientPath)) {
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    
    // Check if it's using the bad ThemeRenderer pattern without variables
    if (clientContent.includes('theme={theme}') && !clientContent.includes('const theme')) {
      // Need to find the config and business imports
      const configMatch = clientContent.match(/([A-Z0-9_]+_CONFIG)/);
      const bizMatch = clientContent.match(/([A-Z0-9_]+_BUSINESS)/);
      
      if (configMatch && bizMatch) {
         const themeVarName = configMatch[1];
         const bizVarName = bizMatch[1];
         
         // Inject const theme = ... and const business = ... inside the function body
         // Find `export default function ...() {`
         clientContent = clientContent.replace(/(export default function \w+\(\)\s*\{)/, 
           `$1\n  const theme = ${themeVarName};\n  const business = ${bizVarName};\n`);
         
         fs.writeFileSync(clientPath, clientContent);
         console.log('Fixed', folder);
      }
    }
    
    // Also, there was TS2307: Cannot find module '@kepenk/templates/src/sections/muhasebeci/MuhasebeciBeyanSections' 
    // Wait, if it couldn't find those, they might have been deleted or the script didn't run on them.
    // Specifically `muhasebe-beyan/client.tsx` failed because that file didn't exist or something.
    if (clientContent.includes('MuhasebeciBeyanSections')) {
      clientContent = clientContent.replace(/import \{.*?Muhasebeci.*?\} from '.*?';?/g, '');
      // and maybe bad relative imports like @kepenk/templates/src/... should just be @kepenk/templates
      clientContent = clientContent.replace(/from\s+'@kepenk\/templates\/.*?';/g, "from '@kepenk/templates';");
      fs.writeFileSync(clientPath, clientContent);
    }
  }
}
