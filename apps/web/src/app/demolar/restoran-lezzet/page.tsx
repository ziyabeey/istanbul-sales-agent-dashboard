import { Metadata } from 'next'
import ClientPage from './client'
import { RESTORAN_LEZZET_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${RESTORAN_LEZZET_BUSINESS.name} | kepenk.ai Demo`,
  description: RESTORAN_LEZZET_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}