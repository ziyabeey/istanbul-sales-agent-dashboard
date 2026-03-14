'use client'
import { useRouter } from 'next/navigation'

export default function OdemeBasarisiz() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-7xl">😕</div>

        <div>
          <h1 className="text-foreground font-syne font-extrabold text-2xl">
            Ödeme Tamamlanamadı
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Kartınızdan herhangi bir ücret alınmadı. Tekrar deneyebilirsiniz.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5 space-y-3 text-left">
          <p className="text-foreground text-sm font-syne font-semibold">
            Sık karşılaşılan nedenler:
          </p>
          {[
            'Kart limiti yetersiz',
            'Banka tarafından bloke edildi',
            'Kart bilgisi hatalı girildi',
            '3D Secure onayı tamamlanmadı',
          ].map((n, i) => (
            <p key={i} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-rust">•</span> {n}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/odeme')}
            className="w-full bg-rust text-foreground font-syne font-bold py-4 rounded-2xl"
          >
            Tekrar Dene →
          </button>
          <a
            href="https://wa.me/908500000000?text=Ödeme%20sorunum%20var"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full border border-border
                       text-muted-foreground py-3 rounded-2xl text-sm"
          >
            💬 Destek Al
          </a>
        </div>
      </div>
    </div>
  )
}
