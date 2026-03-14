'use client'

import { redirect } from 'next/navigation'

/**
 * /demolar → /demolar/vitrin yönlendirmesi.
 * Eski `@kepenk/config/sectors` bağımlılığı kaldırıldı.
 * Tüm demo görüntüleme artık vitrin sayfası üzerinden yapılıyor.
 */
export default function DemolarPage() {
    redirect('/demolar/vitrin')
}
