'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTO_MEKANIK_CONFIG, OTO_MEKANIK_BUSINESS } from '@kepenk/templates/src/themes/configs/oto-mekanik-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTO_MEKANIK_CONFIG} business={OTO_MEKANIK_BUSINESS} />
      <DemoShowcaseNode
        config={OTO_MEKANIK_CONFIG}
        business={OTO_MEKANIK_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
