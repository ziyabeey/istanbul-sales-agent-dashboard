'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SectionLoader } from '@/components/section-loader';
import { INSAAT_SADE_CONFIG, INSAAT_SADE_BUSINESS } from '@kepenk/templates';
import { DemoNavigation } from '@/components/demo-navigation';

export default function ClientPage() {
  const homePage = INSAAT_SADE_CONFIG.pages.find((p) => p.isHomePage);

  if (!homePage) {
    return <div>Ana sayfa bulunamadı</div>;
  }

  return (
    <ThemeProvider config={INSAAT_SADE_CONFIG}>
      <DemoNavigation 
        config={INSAAT_SADE_CONFIG} 
        businessData={INSAAT_SADE_BUSINESS} 
      />
      <main className="min-h-screen">
        {homePage.sections.map((sectionConfig) => (
          <SectionLoader
            key={sectionConfig.id}
            section={sectionConfig}
            businessData={INSAAT_SADE_BUSINESS}
          />
        ))}
      </main>
    </ThemeProvider>
  );
}
