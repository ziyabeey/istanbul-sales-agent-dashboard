/** Presentation only: the accepted server transport must supply the real status. */
export type HomeSourceStatus =
  | 'not_connected'
  | 'loading'
  | 'ready'
  | 'unavailable'
  | 'forbidden'
  | 'stale'

export interface HomeReadiness {
  kind: 'feed' | 'quiet' | Exclude<HomeSourceStatus, 'ready'>
  canShowCards: boolean
  canShowCounts: boolean
  title: string
  description: string
}

const sourceMessages: Record<Exclude<HomeSourceStatus, 'ready'>, { title: string; description: string }> = {
  not_connected: {
    title: 'Randevu henüz bağlı değil.',
    description: 'İşlerini burada görebilmen için önce Randevu bağlantısı kurulmalı. Henüz işletmene ait bilgiler gösterilmiyor.',
  },
  loading: {
    title: 'İşlerin kontrol ediliyor.',
    description: 'Bilgilerin gelmesini bekliyoruz. Kontrol bitmeden işlerin hakkında bir sonuç gösteremeyiz.',
  },
  unavailable: {
    title: 'İşlerini şu an kontrol edemedik.',
    description: 'Bilgilerine ulaşamadık. Bu, ilgilenmen gereken iş olmadığı anlamına gelmez. Bağlantı kurulduktan sonra yeniden kontrol edilmeli.',
  },
  forbidden: {
    title: 'Bu işletmenin işlerini görme yetkin yok.',
    description: 'Doğru işletmeyi seçtiğinden emin ol. Erişim için işletme yöneticisine başvur.',
  },
  stale: {
    title: 'Bilgilerin güncel olduğundan emin değiliz.',
    description: 'Son kontrolden sonra değişiklik olmuş olabilir. Bilgiler yenilenene kadar kartları göstermiyoruz.',
  },
}

export function getHomeReadiness(
  sourceStatus: HomeSourceStatus,
  counts: { visible: number; deferred: number },
): HomeReadiness {
  if (sourceStatus !== 'ready') {
    return {
      kind: sourceStatus,
      canShowCards: false,
      canShowCounts: false,
      ...sourceMessages[sourceStatus],
    }
  }

  if (counts.visible > 0) {
    return { kind: 'feed', canShowCards: true, canShowCounts: true, title: '', description: '' }
  }

  return {
    kind: 'quiet',
    canShowCards: true,
    canShowCounts: true,
    title: 'Şu an ilgilenmen gereken bir iş yok.',
    description: counts.deferred > 0
      ? 'Acil olmayan işler aşağıda. Bu özet yalnız kontrol edilen kayıtları kapsar.'
      : 'Bu özet yalnız kontrol edilen kayıtları kapsar. Diğer uygulamalardaki işleri kapsamaz.',
  }
}
