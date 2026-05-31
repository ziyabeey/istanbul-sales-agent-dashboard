import { notFound } from 'next/navigation'
import { getTheme } from '@kepenk/templates/catalog'
import ClientComponent from './client'

export default async function Page({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params
  const theme = getTheme(themeId)
  if (!theme) return notFound()
  return (
    <ClientComponent
      themeId={themeId}
      sectorId={theme.sectorId}
      seoSchemaType={theme.seoSchemaType}
    />
  )
}