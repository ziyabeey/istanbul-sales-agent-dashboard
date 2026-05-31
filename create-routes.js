const fs = require('fs');
const path = require('path');

const themes = [
  { id: 'oto-filo', config: 'OTO_FILO_CONFIG', business: 'OTO_FILO_BUSINESS' },
  { id: 'oto-guven', config: 'OTO_GUVEN_CONFIG', business: 'OTO_GUVEN_BUSINESS' },
  { id: 'oto-hizli', config: 'OTO_HIZLI_CONFIG', business: 'OTO_HIZLI_BUSINESS' },
  { id: 'oto-kaporta', config: 'OTO_KAPORTA_CONFIG', business: 'OTO_KAPORTA_BUSINESS' },
  { id: 'oto-lastik', config: 'OTO_LASTIK_CONFIG', business: 'OTO_LASTIK_BUSINESS' },
];

const baseDir = 'apps/web/src/app/demolar';

for (const t of themes) {
  const dir = path.join(baseDir, t.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const pageContent = `import { Metadata } from 'next'
import Client from './client'
import { ${t.business} } from '@kepenk/templates'

export const metadata: Metadata = {
  title: \`\${${t.business}.name} | Kepenk.ai Demo\`,
  description: ${t.business}.slogan,
}

export default function Page() {
  return <Client />
}
`;

  const clientContent = `// @ts-nocheck
'use client'

import { ThemeRenderer, ${t.config}, ${t.business} } from '@kepenk/templates'

export default function Client() {
  const t = ${t.config}, p = t.pages[0]!, b = ${t.business}
  return (
    <div lang="tr">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({ 
            '@context': 'https://schema.org', 
            '@type': 'AutoRepair', 
            name: b.name, 
            telephone: b.phone, 
            address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } 
          }) 
        }} 
      />
      <ThemeRenderer theme={t} page={p} business={b} />
    </div>
  )
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
  fs.writeFileSync(path.join(dir, 'client.tsx'), clientContent);
}

console.log('Generated routes for 5 themes.');
