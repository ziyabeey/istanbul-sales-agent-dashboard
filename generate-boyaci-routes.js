const fs = require('fs');
const path = require('path');

const variants = ['boyaci-dekoratif', 'boyaci-dis', 'boyaci-endustriyel', 'boyaci-ev', 'boyaci-lux'];
const baseDir = path.join(__dirname, 'apps/web/src/app/demolar');

variants.forEach(variant => {
  const dir = path.join(baseDir, variant);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const pageContent = `import { THEME_CATALOG } from '@kepenk/templates';
import ClientPage from './client';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const theme = THEME_CATALOG.find((t) => t.id === '${variant}');
  if (!theme) return { title: 'Not Found' };
  
  return {
    title: \`\${theme.name} | Kepenk Demo\`,
    description: theme.description,
  };
}

export default function Page() {
  const theme = THEME_CATALOG.find((t) => t.id === '${variant}');
  
  if (!theme) {
    notFound();
  }

  return <ClientPage theme={theme} />;
}
`;

  const clientContent = `'use client';

import React from 'react';
import { ThemeRenderer, generateStructuredData } from '@kepenk/templates';
import type { ThemeConfig } from '@kepenk/templates';

export default function ClientPage({ theme }: { theme: ThemeConfig }) {
  const schemaStr = React.useMemo(() => {
    try {
      const schemaObj = generateStructuredData(theme);
      return JSON.stringify(schemaObj);
    } catch (e) {
      console.error('Failed to generate schema', e);
      return null;
    }
  }, [theme]);

  React.useEffect(() => {
    if (theme.cssVariables) {
      Object.entries(theme.cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });
    }
  }, [theme.cssVariables]);

  return (
    <main>
      {schemaStr && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaStr }}
        />
      )}
      <ThemeRenderer theme={theme} />
    </main>
  );
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
  fs.writeFileSync(path.join(dir, 'client.tsx'), clientContent);
  console.log(`Generated routes for ${variant}`);
});
