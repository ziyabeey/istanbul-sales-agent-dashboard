'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTO_VIP_CONFIG, OTO_VIP_BUSINESS } from '@kepenk/templates/src/themes/configs/oto-vip-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTO_VIP_CONFIG} business={OTO_VIP_BUSINESS} />
      <DemoShowcaseNode
        config={OTO_VIP_CONFIG}
        business={OTO_VIP_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
