import { Metadata } from 'next'
import Client from './client'
import { OTO_FILO_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${OTO_FILO_BUSINESS.name} | Kepenk.ai Demo`,
  description: OTO_FILO_BUSINESS.slogan,
}

export default function Page() {
  return <Client />
}
