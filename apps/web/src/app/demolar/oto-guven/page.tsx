import { Metadata } from 'next'
import Client from './client'
import { OTO_GUVEN_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${OTO_GUVEN_BUSINESS.name} | Kepenk.ai Demo`,
  description: OTO_GUVEN_BUSINESS.slogan,
}

export default function Page() {
  return <Client />
}
