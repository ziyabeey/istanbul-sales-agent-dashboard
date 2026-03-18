import { Metadata } from 'next'
import TemalarClient from './TemalarClient'

export const metadata: Metadata = {
  title: 'Tema Mağazası | kepenk.ai',
  description:
    '200+ profesyonel esnaf web sitesi şablonu. 29 sektör, 12 tasarım stili. Sektörüne uygun tasarımı seç, özelleştir, yayınla.',
  openGraph: {
    title: 'Tema Mağazası | kepenk.ai',
    description:
      '200+ profesyonel esnaf web sitesi şablonu. Sektörüne uygun tasarımı seç, özelleştir, yayınla.',
  },
}

export default function TemalarPage() {
  return <TemalarClient />
}
