import { Metadata } from 'next'
import Client from './client'
import { OTO_LASTIK_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${OTO_LASTIK_BUSINESS.name} | Kepenk.ai Demo`,
  description: OTO_LASTIK_BUSINESS.slogan,
}

export default function Page() {
  return <Client />
}
