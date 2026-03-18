import { adminDb } from '@/lib/firebaseAdmin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DURUM_ETIKETLERI, ONCELIK_ETIKETLERI, TALEP_KATEGORILERI } from '@/data/destekTalepConfig'
import TalepMesajlar from '@/components/destek/TalepMesajlar'
import DestekIkon from '@/components/destek/DestekIkon'

export default async function TalepDetaySayfasi({
  params,
}: {
  params: Promise<{ referans: string }>
}) {
  const { referans: talepId } = await params

  const doc = await adminDb.collection('destek_talepler').doc(talepId).get()
  if (!doc.exists) return notFound()

  const d = doc.data()!
  const durum = DURUM_ETIKETLERI[d.durum] || { etiket: d.durum, renk: 'bg-gray-100 text-gray-600' }
  const oncelik = ONCELIK_ETIKETLERI[d.oncelik as keyof typeof ONCELIK_ETIKETLERI] || { etiket: d.oncelik, renk: 'bg-gray-100 text-gray-600' }
  const kategoriMeta = TALEP_KATEGORILERI.find((k) => k.id === d.kategori)

  const mesajlar = (d.mesajlar || []).map((m: Record<string, unknown>) => ({
    ...m,
    tarih: m.tarih && typeof (m.tarih as { toDate?: () => Date }).toDate === 'function'
      ? (m.tarih as { toDate: () => Date }).toDate().toISOString()
      : m.tarih || new Date().toISOString(),
  }))

  return (
    <div>
      <Link
        href="/destek/talep/takip"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Talep Takip
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Referans: <span className="font-mono font-bold">{d.referans}</span></p>
            <h1 className="text-xl font-bold font-syne text-foreground">{d.konu}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${oncelik.renk}`}>
              {oncelik.etiket}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${durum.renk}`}>
              {durum.etiket}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Kategori</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {kategoriMeta && <DestekIkon ad={kategoriMeta.ikon} className="w-4 h-4" />}
              <span className="font-medium">{kategoriMeta?.etiket || d.kategori}</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Oluşturma</p>
            <p className="font-medium mt-0.5">
              {d.olusturma?.toDate ? new Date(d.olusturma.toDate()).toLocaleDateString('tr-TR') : '-'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Ad</p>
            <p className="font-medium mt-0.5">{d.ad}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">E-posta</p>
            <p className="font-medium mt-0.5">{d.eposta}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Açıklama</p>
          <p className="text-sm text-foreground whitespace-pre-wrap">{d.aciklama}</p>
        </div>

        {/* Messages */}
        <TalepMesajlar
          talepId={doc.id}
          mesajlar={mesajlar}
          eposta={d.eposta}
        />
      </div>
    </div>
  )
}
