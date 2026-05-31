// @ts-nocheck
'use client'


import {
  ThemeRenderer
} from '@kepenk/templates'
import { MIMARLIK_PERSPEKTIF_CONFIG, MIMARLIK_PERSPEKTIF_BUSINESS } from '@kepenk/templates'

export default function MimarlikPerspektifClient() {
  const theme = MIMARLIK_PERSPEKTIF_CONFIG;
  const business = MIMARLIK_PERSPEKTIF_BUSINESS;

  return (
    <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
  )
}
