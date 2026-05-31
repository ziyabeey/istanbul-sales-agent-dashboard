'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTOYIKAMA_LUX_CONFIG, OTOYIKAMA_LUX_BUSINESS } from '@kepenk/templates/src/themes/configs/otoyikama-lux-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTOYIKAMA_LUX_CONFIG} business={OTOYIKAMA_LUX_BUSINESS} />
      <DemoShowcaseNode
        config={OTOYIKAMA_LUX_CONFIG}
        business={OTOYIKAMA_LUX_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
