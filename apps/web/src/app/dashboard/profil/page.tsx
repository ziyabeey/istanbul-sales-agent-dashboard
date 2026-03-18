'use client'
import { useState } from 'react'
import { useEsnaf } from '@/context/EsnafContext'
import { toast } from 'sonner'

export default function ProfilPage() {
    const { esnaf, esnafId } = useEsnaf()
    const [duzenlemeModu, setDuzenlemeModu] = useState(false)
    const [instagramEkleModu, setInstagramEkleModu] = useState(false)
    const [instagramInput, setInstagramInput] = useState('')
    const [form, setForm] = useState({
        ad: esnaf?.ad || '',
        telefon: esnaf?.telefon || '',
        adres: esnaf?.adres || '',
    })
    const [bildirimler, setBildirimler] = useState(
        esnaf?.bildirimAyarlari || { sabahMesaji: true, olumsuzYorum: true, haftalikRapor: true }
    )
    const [kaydediliyor, setKaydediliyor] = useState(false)
    const [mesaj, setMesaj] = useState('')

    async function handleKaydet() {
        // Validate phone
        const telefonDigits = form.telefon.replace(/[^0-9]/g, '')
        if (form.telefon && telefonDigits.length < 10) {
            toast.error('Gecerli bir telefon numarasi girin (en az 10 hane)')
            return
        }
        setKaydediliyor(true)
        try {
            const res = await fetch(`/api/esnaf/${esnafId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setMesaj('✓ Kaydedildi')
                setDuzenlemeModu(false)
            } else {
                setMesaj('❌ Hata oluştu')
            }
        } catch {
            setMesaj('❌ Bağlantı hatası')
        }
        setKaydediliyor(false)
        setTimeout(() => setMesaj(''), 3000)
    }

    async function handleBildirimToggle(alan: keyof typeof bildirimler) {
        const yeni = { ...bildirimler, [alan]: !bildirimler[alan] }
        setBildirimler(yeni)
        try {
            const res = await fetch(`/api/esnaf/${esnafId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bildirimAyarlari: yeni }),
            })
            if (!res.ok) throw new Error()
            toast.success('Bildirim ayarları güncellendi')
        } catch {
            setBildirimler(bildirimler) // rollback
            toast.error('Bildirim ayarları kaydedilemedi')
        }
    }

    const alanEtiketleri: Record<string, string> = {
        ad: 'İşletme Adı',
        telefon: 'Telefon',
        adres: 'Adres',
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-foreground font-syne font-bold text-xl">Profilim</h1>
                {mesaj && <span className="text-sage text-sm font-syne">{mesaj}</span>}
            </div>

            {/* İşletme bilgileri */}
            <div className="bg-card rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">İşletme Bilgileri</p>
                    <button
                        onClick={() => {
                            if (!duzenlemeModu) {
                                // Formu esnaf verileriyle doldur
                                setForm({ ad: esnaf?.ad || '', telefon: esnaf?.telefon || '', adres: esnaf?.adres || '' })
                            }
                            setDuzenlemeModu(!duzenlemeModu)
                        }}
                        className="text-rust text-sm font-syne"
                    >
                        {duzenlemeModu ? 'İptal' : '✎ Düzenle'}
                    </button>
                </div>

                {(['ad', 'telefon', 'adres'] as const).map((alan) => (
                    <div key={alan}>
                        <p className="text-muted-foreground text-xs mb-1">{alanEtiketleri[alan]}</p>
                        {duzenlemeModu ? (
                            <input
                                value={form[alan]}
                                onChange={(e) => setForm({ ...form, [alan]: e.target.value })}
                                className="w-full bg-background text-foreground rounded-xl px-3 py-2 text-sm outline-none border border-border focus:border-rust transition-colors"
                            />
                        ) : (
                            <p className="text-foreground text-sm">
                                {esnaf?.[alan] || <span className="text-muted-foreground italic">—</span>}
                            </p>
                        )}
                    </div>
                ))}

                {duzenlemeModu && (
                    <button
                        onClick={handleKaydet}
                        disabled={kaydediliyor}
                        className="w-full bg-rust text-foreground font-syne font-bold py-3 rounded-xl mt-2 disabled:opacity-50 transition-opacity"
                    >
                        {kaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                )}
            </div>

            {/* Paket */}
            <div className="bg-card rounded-2xl p-4">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-3">Aktif Paket</p>
                <div className="flex items-center justify-between">
                    <span className="bg-rust/20 text-rust border border-rust/30 px-3 py-1 rounded-full font-syne font-bold text-sm">
                        {esnaf?.paket || '—'}
                    </span>
                    <button
                        onClick={() => { window.location.href = '/#pricing' }}
                        className="text-rust text-sm font-syne"
                    >
                        Yükselt →
                    </button>
                </div>
                <p className="text-muted-foreground text-xs mt-2">
                    Site:{' '}
                    {esnaf?.subdomain
                        ? <a href={esnaf.subdomainUrl} target="_blank" rel="noreferrer" className="text-steel underline">{esnaf.subdomain}.kepenk.ai</a>
                        : <span className="italic">hazırlanıyor...</span>
                    }
                </p>
            </div>

            {/* Sosyal Medya */}
            <div className="bg-card rounded-2xl p-4 space-y-3">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">Sosyal Medya</p>

                {/* Instagram */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">📸</span>
                        <div>
                            <p className="text-foreground text-sm">Instagram</p>
                            {esnaf?.instagramUsername ? (
                                <a
                                    href={`https://instagram.com/${esnaf.instagramUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-steel text-xs"
                                >
                                    @{esnaf.instagramUsername}
                                </a>
                            ) : (
                                <p className="text-muted-foreground text-xs italic">Bağlı değil</p>
                            )}
                        </div>
                    </div>
                    {!esnaf?.instagramUsername ? (
                        <button
                            onClick={() => setInstagramEkleModu(true)}
                            className="bg-rust/20 border border-rust text-rust text-xs px-3 py-1.5 rounded-lg"
                        >
                            + Ekle
                        </button>
                    ) : (
                        <span className="text-sage text-xs">✓ Bağlı</span>
                    )}
                </div>

                {/* Instagram ekle modal */}
                {instagramEkleModu && (
                    <div className="bg-background rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-1 bg-card rounded-lg px-3">
                            <span className="text-muted-foreground text-sm">@</span>
                            <input
                                value={instagramInput}
                                onChange={(e) => setInstagramInput(e.target.value.replace('@', ''))}
                                placeholder="kullanici_adi"
                                className="flex-1 bg-transparent text-foreground py-2 text-sm outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    if (!instagramInput) return
                                    try {
                                        const res = await fetch(`/api/esnaf/${esnafId}`, {
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                instagramUsername: instagramInput,
                                                instagramUrl: `https://instagram.com/${instagramInput}`,
                                            }),
                                        })
                                        if (!res.ok) throw new Error()
                                        toast.success('Instagram hesabı bağlandı')
                                        setInstagramEkleModu(false)
                                        window.location.reload()
                                    } catch {
                                        toast.error('Instagram bağlanamadı. Tekrar deneyin.')
                                    }
                                }}
                                className="flex-1 bg-rust text-foreground py-2 rounded-lg text-sm font-bold"
                            >
                                Kaydet
                            </button>
                            <button
                                onClick={() => setInstagramEkleModu(false)}
                                className="bg-card border border-border text-muted-foreground px-4 py-2 rounded-lg text-sm"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bildirimler */}
            <div className="bg-card rounded-2xl p-4 space-y-4">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">Bildirimler</p>
                {(
                    [
                        { alan: 'sabahMesaji', etiket: '🌅 Sabah mesajı (08:00)' },
                        { alan: 'olumsuzYorum', etiket: '⚠️ Olumsuz yorum bildirimi' },
                        { alan: 'haftalikRapor', etiket: '📊 Haftalık rapor (Cuma)' },
                    ] as const
                ).map(({ alan, etiket }) => (
                    <div key={alan} className="flex items-center justify-between">
                        <span className="text-foreground text-sm">{etiket}</span>
                        <button
                            onClick={() => handleBildirimToggle(alan)}
                            className={`w-12 h-6 rounded-full transition-all relative ${bildirimler[alan] ? 'bg-rust' : 'bg-stone/40'
                                }`}
                            role="switch"
                            aria-checked={bildirimler[alan]}
                            aria-label={etiket}
                        >
                            <span
                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${bildirimler[alan] ? 'right-0.5' : 'left-0.5'
                                    }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
