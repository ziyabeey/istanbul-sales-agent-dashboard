// @ts-nocheck
'use client'


import {
  ThemeRenderer
} from '@kepenk/templates'
import { MIMARLIK_CIZGI_CONFIG, MIMARLIK_CIZGI_BUSINESS } from '@kepenk/templates'

export default function MimarlikCizgiClient() {
  const theme = MIMARLIK_CIZGI_CONFIG;
  const business = MIMARLIK_CIZGI_BUSINESS;

  return (
    <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
  )
}
