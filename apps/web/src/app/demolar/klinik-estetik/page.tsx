import { Metadata } from 'next'
import ClientPage from './client'
import { KLINIK_ESTETIK_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${KLINIK_ESTETIK_BUSINESS.name} | kepenk.ai Demo`,
  description: KLINIK_ESTETIK_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
