import { Metadata } from 'next'
import ClientPage from './client'
import { RESTORAN_KLASIK_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${RESTORAN_KLASIK_BUSINESS.name} | kepenk.ai Demo`,
  description: RESTORAN_KLASIK_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
