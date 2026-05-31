'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { CICEKCI_DUGUN_CONFIG, CICEKCI_DUGUN_BUSINESS } from '@kepenk/templates/src/themes/configs/cicekci-dugun-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={CICEKCI_DUGUN_CONFIG} business={CICEKCI_DUGUN_BUSINESS} />
      <DemoShowcaseNode
        config={CICEKCI_DUGUN_CONFIG}
        business={CICEKCI_DUGUN_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
