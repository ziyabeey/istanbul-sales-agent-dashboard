import { Metadata } from 'next'
import SektorlerClient from './SektorlerClient'

export const metadata: Metadata = {
    title: 'Tüm Sektörler | kepenk.ai — 22+ Sektöre Özel AI Asistan',
    description: 'Restorandan berbere, avukattan tesisatçıya — 22+ sektöre özel yapay zeka asistanı. İşletmenizin sektörünü seçin ve hemen başlayın.',
}

export default function SektorlerPage() {
    return <SektorlerClient />
}
