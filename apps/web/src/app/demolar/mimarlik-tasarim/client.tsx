// @ts-nocheck
'use client'


import {
  ThemeRenderer
} from '@kepenk/templates'
import { MIMARLIK_TASARIM_CONFIG, MIMARLIK_TASARIM_BUSINESS } from '@kepenk/templates'

export default function MimarlikTasarimClient() {
  const theme = MIMARLIK_TASARIM_CONFIG;
  const business = MIMARLIK_TASARIM_BUSINESS;

  return (
    <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
  )
}
