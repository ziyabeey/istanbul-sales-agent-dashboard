/**
 * Merkezi iletişim bilgileri — Tüm sayfalarda bu dosyadan referans alınır.
 * WhatsApp numarası alındığında sadece burayı güncelle.
 */
export const ILETISIM = {
    whatsappNumara: '908503055097',
    whatsappGosterim: '0850 305 50 97',
    email: 'destek@kepenk.ai',
    emailKurumsal: 'kurumsal@kepenk.ai',
    adres: 'Teknopark İstanbul Kuluçka Merkezi, Pendik / İstanbul',
    sirketUnvani: 'yzt.digital',
} as const

export function waLink(mesaj?: string): string {
    const base = `https://wa.me/${ILETISIM.whatsappNumara}`
    return mesaj ? `${base}?text=${encodeURIComponent(mesaj)}` : base
}
