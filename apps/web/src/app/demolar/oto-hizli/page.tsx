import { Metadata } from 'next'
import Client from './client'
import { OTO_HIZLI_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${OTO_HIZLI_BUSINESS.name} | Kepenk.ai Demo`,
  description: OTO_HIZLI_BUSINESS.slogan,
}

export default function Page() {
  return <Client />
}
