'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTOYIKAMA_DETAY_CONFIG, OTOYIKAMA_DETAY_BUSINESS } from '@kepenk/templates/src/themes/configs/otoyikama-detay-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTOYIKAMA_DETAY_CONFIG} business={OTOYIKAMA_DETAY_BUSINESS} />
      <DemoShowcaseNode
        config={OTOYIKAMA_DETAY_CONFIG}
        business={OTOYIKAMA_DETAY_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
