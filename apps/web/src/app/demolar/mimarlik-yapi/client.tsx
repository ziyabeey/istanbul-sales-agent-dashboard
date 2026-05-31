// @ts-nocheck
'use client'


import {
  ThemeRenderer
} from '@kepenk/templates'
import { MIMARLIK_YAPI_CONFIG, MIMARLIK_YAPI_BUSINESS } from '@kepenk/templates'

export default function MimarlikYapiClient() {
  const theme = MIMARLIK_YAPI_CONFIG;
  const business = MIMARLIK_YAPI_BUSINESS;

  return (
    <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
  )
}
