const fs = require('fs');
const path = require('path');

const slugs = [
  'guzellik-atelier',
  'guzellik-blanc',
  'guzellik-dermis',
  'guzellik-glow',
  'guzellik-narin'
];

const baseDir = path.join(__dirname, 'apps/web/src/app/demolar');

slugs.forEach(slug => {
  const dirPath = path.join(baseDir, slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // page.tsx
  const pageContent = `import { THEME_CATALOG } from '@kepenk/templates';
import ClientPage from './client';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const theme = THEME_CATALOG.find((t) => t.id === '${slug}');
  if (!theme) return { title: 'Not Found' };
  
  return {
    title: \`\${theme.name} | Kepenk Demo\`,
    description: theme.description,
  };
}

export default function Page() {
  const theme = THEME_CATALOG.find((t) => t.id === '${slug}');
  
  if (!theme) {
    notFound();
  }

  return <ClientPage theme={theme} />;
}
`;

  // client.tsx
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

  // Set the root level CSS variables
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

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent, 'utf8');
  fs.writeFileSync(path.join(dirPath, 'client.tsx'), clientContent, 'utf8');
  console.log('Generated routes for ' + slug);
});
