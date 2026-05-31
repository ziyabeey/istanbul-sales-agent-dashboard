import { Metadata } from 'next'
import ClientPage from './client'
import { KLINIK_MODERN_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${KLINIK_MODERN_BUSINESS.name} | kepenk.ai Demo`,
  description: KLINIK_MODERN_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
