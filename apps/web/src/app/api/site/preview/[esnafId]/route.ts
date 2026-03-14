import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ esnafId: string }> }
) {
    const { esnafId } = await params

    if (!adminDb) {
        return new Response('Veritabanı bağlantısı yok', { status: 500 })
    }

    try {
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) {
            return new Response('Esnaf bulunamadı', { status: 404 })
        }

        const html = doc.data()?.siteHtml
        if (!html) {
            return new Response(
                `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Site Hazırlanıyor</title></head>
<body style="font-family:monospace;padding:2rem;background:#0f172a;color:#94a3b8;">
<h2>Site henüz oluşturulmadı</h2>
<p>Esnaf ID: ${esnafId}</p>
<p>Admin panelinden "Site Üret" butonuna tıklayın.</p>
</body></html>`,
                { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            )
        }

        return new Response(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
    } catch (error: any) {
        return new Response(`Hata: ${error.message}`, { status: 500 })
    }
}
