/**
 * src/utils/anonimize.ts
 * Kolektif zeka kayıtlarına gitmeden önce verilerdeki KVKK
 * ve kişisel tanımlayıcı bilgileri (İsim, Telefon, Eposta) temizler.
 */

export function anonimizeBaglam(baglam: string, esnaf: any): string {
    if (!baglam) return ''

    let temiz = baglam

    // İşletme adını ve Esnaf adını çıkar
    if (esnaf?.isletmeAdi) {
        temiz = temiz.replace(new RegExp(esnaf.isletmeAdi, 'gi'), '[İŞLETME]')
    }
    if (esnaf?.ad) {
        temiz = temiz.replace(new RegExp(esnaf.ad, 'gi'), '[ESNAF]')
    }

    // Telefon numaralarını çıkar (+90... veya 05...)
    temiz = temiz.replace(/\+?90\d{10}/g, '[TELEFON]')
    temiz = temiz.replace(/0\d{10}/g, '[TELEFON]')
    // Formatlı telefonları yakalamak için (Örn: 0532 123 45 67)
    temiz = temiz.replace(/0\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}/g, '[TELEFON]')

    // E-posta adreslerini çıkar
    temiz = temiz.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EPOSTA]')

    return temiz
}
