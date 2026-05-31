import { Metadata } from 'next'
import ClientPage from './client'
import { RESTORAN_HIZLI_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${RESTORAN_HIZLI_BUSINESS.name} | kepenk.ai Demo`,
  description: RESTORAN_HIZLI_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
