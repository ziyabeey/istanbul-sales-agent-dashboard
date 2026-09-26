import { notFound } from 'next/navigation'
import { getRenderableDemoTheme } from '@/lib/demoTheme'
import { isRetiredDemo } from '@/data/sablonlar/curation'
import ClientComponent from './client'

export default async function Page({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params
  if (isRetiredDemo(themeId)) notFound()
  // A catalog label alone does not establish that the demo has source data.
  const theme = getRenderableDemoTheme(themeId)
  if (!theme) notFound()
  return (
    <ClientComponent
      themeId={theme.id}
      sectorId={theme.sectorId}
      seoSchemaType={theme.seoSchemaType}
    />
  )
}
