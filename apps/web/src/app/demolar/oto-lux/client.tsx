'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTO_LUX_CONFIG, OTO_LUX_BUSINESS } from '@kepenk/templates/src/themes/configs/oto-lux-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTO_LUX_CONFIG} business={OTO_LUX_BUSINESS} />
      <DemoShowcaseNode
        config={OTO_LUX_CONFIG}
        business={OTO_LUX_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
