'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SectionLoader } from '@/components/section-loader';
import { INSAAT_KURUMSAL_CONFIG, INSAAT_KURUMSAL_BUSINESS } from '@kepenk/templates';
import { DemoNavigation } from '@/components/demo-navigation';

export default function ClientPage() {
  const homePage = INSAAT_KURUMSAL_CONFIG.pages.find((p) => p.isHomePage);

  if (!homePage) {
    return <div>Ana sayfa bulunamadı</div>;
  }

  return (
    <ThemeProvider config={INSAAT_KURUMSAL_CONFIG}>
      <DemoNavigation 
        config={INSAAT_KURUMSAL_CONFIG} 
        businessData={INSAAT_KURUMSAL_BUSINESS} 
      />
      <main className="min-h-screen">
        {homePage.sections.map((sectionConfig) => (
          <SectionLoader
            key={sectionConfig.id}
            section={sectionConfig}
            businessData={INSAAT_KURUMSAL_BUSINESS}
          />
        ))}
      </main>
    </ThemeProvider>
  );
}
