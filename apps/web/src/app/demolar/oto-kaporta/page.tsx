import { Metadata } from 'next'
import Client from './client'
import { OTO_KAPORTA_BUSINESS } from '@kepenk/templates'

export const metadata: Metadata = {
  title: `${OTO_KAPORTA_BUSINESS.name} | Kepenk.ai Demo`,
  description: OTO_KAPORTA_BUSINESS.slogan,
}

export default function Page() {
  return <Client />
}
