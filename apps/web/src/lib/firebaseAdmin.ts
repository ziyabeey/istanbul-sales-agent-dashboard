import { initializeApp, getApps, cert, applicationDefault, App } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import { getFirebaseRuntimeReadiness } from './firebaseRuntime'

let app: App

const firebaseRuntime = getFirebaseRuntimeReadiness()
let firestoreReady = false

if (!getApps().length) {
    if (firebaseRuntime.credentialMode === 'legacy') {
        app = initializeApp({
            credential: cert({
                projectId: firebaseRuntime.projectId!,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
                privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            }),
            projectId: firebaseRuntime.projectId!,
        })
        firestoreReady = true
    } else if (firebaseRuntime.credentialMode === 'adc') {
        app = initializeApp({
            credential: applicationDefault(),
            projectId: firebaseRuntime.projectId!,
        })
        firestoreReady = true
    } else {
        // Build-time / unconfigured stub. Runtime readiness rejects promotion.
        app = initializeApp({ projectId: 'build-time-stub' })
    }
} else {
    app = getApps()[0]
    firestoreReady = firebaseRuntime.ready || app.options.projectId !== 'build-time-stub'
}

export const adminDb = firestoreReady ? getFirestore(app) : (null as any)
export { Timestamp, FieldValue }

// ─── Esnaf ─────────────────────────────────────────────────────────────────

export async function getEsnaf(esnafId: string) {
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) throw new Error(`Esnaf bulunamadı: ${esnafId}`)
    return { id: doc.id, ...doc.data() } as any
}

export async function getEsnafByPhone(telefon: string) {
    const snap = await adminDb
        .collection('esnaflar')
        .where('waNumarasi', '==', telefon)
        .limit(1)
        .get()
    if (snap.empty) return null
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as any
}

// ─── Kota ──────────────────────────────────────────────────────────────────

export async function getBugunKullanim(esnafId: string): Promise<number> {
    const bugun = new Date().toISOString().split('T')[0]
    const doc = await adminDb
        .collection('kota_kullanim')
        .doc(`${esnafId}_${bugun}`)
        .get()
    return doc.exists ? (doc.data()?.sayi || 0) : 0
}

export async function bugunKullanimiArttir(esnafId: string): Promise<void> {
    const bugun = new Date().toISOString().split('T')[0]
    const ref = adminDb.collection('kota_kullanim').doc(`${esnafId}_${bugun}`)
    await ref.set({ sayi: FieldValue.increment(1) }, { merge: true })
}

// ─── Koleksiyon silme ──────────────────────────────────────────────────────

export async function silKoleksiyon(
    koleksiyon: string,
    alan: string,
    deger: string
): Promise<void> {
    const snap = await adminDb.collection(koleksiyon).where(alan, '==', deger).get()
    if (snap.empty) return
    const batch = adminDb.batch()
    snap.docs.forEach((doc: any) => batch.delete(doc.ref))
    await batch.commit()
}

// ─── Yardımcılar ───────────────────────────────────────────────────────────

export function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    )
}

export function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms))
}

// ─── Kara liste ────────────────────────────────────────────────────────────

export async function karalisteKontrol(telefon: string): Promise<boolean> {
    const snap = await adminDb
        .collection('karaliste')
        .where('telefon', '==', telefon)
        .limit(1)
        .get()
    return !snap.empty
}

export async function karalisteEkle(telefon: string, neden: string): Promise<void> {
    await adminDb.collection('karaliste').add({
        telefon,
        neden,
        zaman: new Date(),
    })
}

// ─── Faz 44: Denormalize İstatistikler (Atomik Aggregation) ────────────────

export interface IslemVerisi {
    tip: 'gelir' | 'gider'
    tutar: number
    aciklama: string
    kategori?: string
    tarih?: Date
}

/**
 * İşlem kaydeder VE esnaf dokümanındaki istatistikleri atomik olarak günceller.
 * N+1 query problemi yok — tek read, tek write.
 */
export async function islemKaydet(esnafId: string, islem: IslemVerisi): Promise<void> {
    const tarih = islem.tarih || new Date()

    // 1. Alt koleksiyona detay yaz
    await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('islemler')
        .add({
            ...islem,
            tarih,
            olusturma: new Date(),
        })

    // 2. Esnaf dokümanındaki aggregation'ı atomik güncelle
    const artis = islem.tip === 'gelir' ? islem.tutar : -islem.tutar
    const gelirArtis = islem.tip === 'gelir' ? islem.tutar : 0
    const giderArtis = islem.tip === 'gider' ? islem.tutar : 0

    await adminDb.collection('esnaflar').doc(esnafId).update({
        'istatistikler.toplam_bakiye': FieldValue.increment(artis),
        'istatistikler.aylik_ciro': FieldValue.increment(gelirArtis),
        'istatistikler.toplam_gelir': FieldValue.increment(gelirArtis),
        'istatistikler.toplam_gider': FieldValue.increment(giderArtis),
        'istatistikler.son_guncelleme': new Date().toISOString(),
    })
}

/** Tek doküman read ile tüm istatistikleri getir (N+1 yok) */
export async function istatistikGetir(esnafId: string) {
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    return doc.data()?.istatistikler || {
        toplam_bakiye: 0,
        aylik_ciro: 0,
        aktif_musteri_sayisi: 0,
        toplam_gelir: 0,
        toplam_gider: 0,
        son_guncelleme: null,
    }
}

/** Müşteri sayısını atomik artır/azalt */
export async function musteriSayisiGuncelle(esnafId: string, degisim: number): Promise<void> {
    await adminDb.collection('esnaflar').doc(esnafId).update({
        'istatistikler.aktif_musteri_sayisi': FieldValue.increment(degisim),
        'istatistikler.son_guncelleme': new Date().toISOString(),
    })
}

// ─── Faz 44: Aylık Kredi Sistemi ──────────────────────────────────────────

function suankiAy(): string {
    return new Date().toISOString().slice(0, 7) // '2026-03'
}

export async function getAylikKredi(esnafId: string): Promise<{ kullanim: number; limit: number }> {
    const ay = suankiAy()
    const doc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('kredi')
        .doc(ay)
        .get()

    if (!doc.exists) {
        return { kullanim: 0, limit: 0 } // limit quotaManager'da hesaplanır
    }

    return doc.data() as { kullanim: number; limit: number }
}

export async function krediKullan(esnafId: string, limit: number): Promise<void> {
    const ay = suankiAy()
    const ref = adminDb.collection('esnaflar').doc(esnafId).collection('kredi').doc(ay)
    await ref.set(
        { kullanim: FieldValue.increment(1), limit, ay },
        { merge: true }
    )
}


