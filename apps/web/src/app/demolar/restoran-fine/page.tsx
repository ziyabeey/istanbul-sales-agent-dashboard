import { Metadata } from 'next'
import ClientPage from './client'
import { RESTORAN_FINE_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${RESTORAN_FINE_BUSINESS.name} | kepenk.ai Demo`,
  description: RESTORAN_FINE_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
