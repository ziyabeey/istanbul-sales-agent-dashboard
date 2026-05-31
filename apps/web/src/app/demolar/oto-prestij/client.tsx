'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTO_PRESTIJ_CONFIG, OTO_PRESTIJ_BUSINESS } from '@kepenk/templates/src/themes/configs/oto-prestij-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTO_PRESTIJ_CONFIG} business={OTO_PRESTIJ_BUSINESS} />
      <DemoShowcaseNode
        config={OTO_PRESTIJ_CONFIG}
        business={OTO_PRESTIJ_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
