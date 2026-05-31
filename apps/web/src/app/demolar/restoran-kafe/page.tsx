import { Metadata } from 'next'
import ClientPage from './client'
import { RESTORAN_KAFE_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${RESTORAN_KAFE_BUSINESS.name} | kepenk.ai Demo`,
  description: RESTORAN_KAFE_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
