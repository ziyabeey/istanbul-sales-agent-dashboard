'use client';

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
