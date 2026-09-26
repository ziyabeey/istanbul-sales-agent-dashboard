import { notFound } from 'next/navigation'
import { getRenderableDemoTheme } from '@/lib/demoTheme'
import DemoClient from '../[themeId]/client'

/** Keep legacy URLs on the same renderer and data path as dynamic demos. */
export default function RegisteredDemo({ themeId }: { themeId: string }) {
  const theme = getRenderableDemoTheme(themeId)
  if (!theme) notFound()

  return (
    <DemoClient
      themeId={theme.id}
      sectorId={theme.sectorId}
      seoSchemaType={theme.seoSchemaType}
    />
  )
}
