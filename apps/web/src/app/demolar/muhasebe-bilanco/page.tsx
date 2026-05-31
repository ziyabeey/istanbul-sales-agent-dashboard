import { Metadata } from 'next'
import ClientPage from './client'
import { P1_DEMO_BUSINESSES } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${P1_DEMO_BUSINESSES.muhasebeci.bilanco.name} | kepenk.ai Demo`,
  description: P1_DEMO_BUSINESSES.muhasebeci.bilanco.slogan,
}

export default function Page() {
  return <ClientPage />
}
