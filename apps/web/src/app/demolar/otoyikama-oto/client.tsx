'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTOYIKAMA_OTO_CONFIG, OTOYIKAMA_OTO_BUSINESS } from '@kepenk/templates/src/themes/configs/otoyikama-oto-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTOYIKAMA_OTO_CONFIG} business={OTOYIKAMA_OTO_BUSINESS} />
      <DemoShowcaseNode
        config={OTOYIKAMA_OTO_CONFIG}
        business={OTOYIKAMA_OTO_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
