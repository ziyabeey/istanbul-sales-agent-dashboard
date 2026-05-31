'use client';

import React from 'react';
import { DemoShowcaseNode } from '@/components/demo-showcase-node';
import { OTOYIKAMA_FLEET_CONFIG, OTOYIKAMA_FLEET_BUSINESS } from '@kepenk/templates/src/themes/configs/otoyikama-fleet-config';
import { DynamicJsonLd } from '@kepenk/templates/src/components/seo/dynamic-json-ld';

export default function ClientPage() {
  return (
    <>
      <DynamicJsonLd config={OTOYIKAMA_FLEET_CONFIG} business={OTOYIKAMA_FLEET_BUSINESS} />
      <DemoShowcaseNode
        config={OTOYIKAMA_FLEET_CONFIG}
        business={OTOYIKAMA_FLEET_BUSINESS}
        isEditable={false}
      />
    </>
  );
}
