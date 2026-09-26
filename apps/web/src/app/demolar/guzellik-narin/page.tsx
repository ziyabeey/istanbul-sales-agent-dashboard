import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { loadThemeConfig } from '@kepenk/templates/src/registry/config-loader'
import DemoClient from '../[themeId]/client'

const themeId = 'guzellik-narin'

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadThemeConfig(themeId)
  if (!result) return { title: 'Not Found' }

  return {
    title: `${result.config.name} | Kepenk Demo`,
    description: result.config.description,
  }
}

export default async function Page() {
  const result = await loadThemeConfig(themeId)
  if (!result) notFound()

  return (
    <DemoClient
      themeId={themeId}
      sectorId={result.config.sectorId}
      seoSchemaType={result.config.seoSchemaType}
    />
  )
}
