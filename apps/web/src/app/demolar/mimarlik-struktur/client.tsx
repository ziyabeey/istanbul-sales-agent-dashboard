// @ts-nocheck
'use client'


import {
  ThemeRenderer
} from '@kepenk/templates'
import { MIMARLIK_STRUKTUR_CONFIG, MIMARLIK_STRUKTUR_BUSINESS } from '@kepenk/templates'

export default function MimarlikStrukturClient() {
  const theme = MIMARLIK_STRUKTUR_CONFIG;
  const business = MIMARLIK_STRUKTUR_BUSINESS;

  return (
    <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
  )
}
