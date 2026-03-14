'use client'

import { redirect } from 'next/navigation'

/**
 * Eski editor sayfası. Artık tüm site düzenleme işlemleri
 * /dashboard/sitem/editor üzerinden yapılıyor.
 */
export default function EditorRedirectPage() {
    redirect('/dashboard/sitem/editor')
}
