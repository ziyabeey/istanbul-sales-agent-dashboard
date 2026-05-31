import { Metadata } from 'next'
import ClientPage from './client'
import { KLINIK_SADE_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${KLINIK_SADE_BUSINESS.name} | kepenk.ai Demo`,
  description: KLINIK_SADE_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
