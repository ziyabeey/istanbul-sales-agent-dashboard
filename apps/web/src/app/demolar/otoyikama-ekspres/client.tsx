'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTOYIKAMA_EKSPRES_CONFIG, OTOYIKAMA_EKSPRES_BUSINESS } from '@kepenk/templates/src/themes/configs/otoyikama-ekspres-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTOYIKAMA_EKSPRES_CONFIG} business={OTOYIKAMA_EKSPRES_BUSINESS} />
      <DemoShowcaseNode
        config={OTOYIKAMA_EKSPRES_CONFIG}
        business={OTOYIKAMA_EKSPRES_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
