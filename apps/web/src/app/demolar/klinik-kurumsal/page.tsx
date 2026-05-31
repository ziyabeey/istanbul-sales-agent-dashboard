import { Metadata } from 'next'
import ClientPage from './client'
import { KLINIK_KURUMSAL_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${KLINIK_KURUMSAL_BUSINESS.name} | kepenk.ai Demo`,
  description: KLINIK_KURUMSAL_BUSINESS.slogan,
}

export default function Page() {
  return <ClientPage />
}
