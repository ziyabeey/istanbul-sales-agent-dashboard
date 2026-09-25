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
    title: 'Önce Randevu bağlantısı gerekiyor.',
    description: 'İşletmenin güncel işlerini henüz okuyamıyoruz. Bağlantı kurulmadan burada gerçek iş veya sonuç gösterilmez.',
  },
  loading: {
    title: 'İşlerin kontrol ediliyor.',
    description: 'Kaynak yanıtını bekliyoruz. Henüz ilgilenmen gereken iş olup olmadığını bilmiyoruz.',
  },
  unavailable: {
    title: 'İşlerini şu an kontrol edemedik.',
    description: 'Veri kaynağına ulaşılamadı. Bu, iş olmadığı anlamına gelmez; bağlantı yeniden kurulunca kontrol edilmeli.',
  },
  forbidden: {
    title: 'Bu işletmenin işlerini görüntüleme yetkin yok.',
    description: 'Doğru işletmeyi seçtiğini kontrol et veya işletme yöneticisinden erişimini kontrol etmesini iste.',
  },
  stale: {
    title: 'İşlerinin güncelliğini doğrulayamadık.',
    description: 'Önceki bilgiler artık güncel olmayabilir. Kaynak yeniden doğrulanmadan kartlar ve işlemler gösterilmez.',
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
      ? 'Daha sonra bakılabilecek işler aşağıda. Bu özet yalnız bu kaynaktan okunan işleri kapsar.'
      : 'Bu özet yalnız bu kaynaktan başarıyla okunan işleri kapsar; diğer ürünler hakkında bilgi vermez.',
  }
}
