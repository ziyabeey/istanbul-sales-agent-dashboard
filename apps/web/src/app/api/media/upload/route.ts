import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * POST /api/media/upload
 * Stores an uploaded image (base64) in Firestore under esnaflar/{esnafId}/media.
 * Client-side resize to 1200px max before sending keeps payload small (~100-300KB).
 */
export async function POST(req: NextRequest) {
    try {
        const { imageBase64, fileName, folder, esnafId, alt } = await req.json()

        if (!imageBase64 || !esnafId) {
            return NextResponse.json({ error: 'imageBase64 ve esnafId gerekli' }, { status: 400 })
        }

        // Validate base64 size (max ~2MB after encoding)
        if (imageBase64.length > 2_800_000) {
            return NextResponse.json({ error: 'Görsel çok büyük. Lütfen 2MB altında yükleyin.' }, { status: 413 })
        }

        const { adminDb, Timestamp } = await import('@/lib/firebaseAdmin')

        // Verify esnaf exists
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const mediaRef = adminDb.collection('esnaflar').doc(esnafId).collection('media').doc()
        const mediaItem = {
            id: mediaRef.id,
            url: imageBase64,
            alt: alt || '',
            folder: folder || 'genel',
            fileName: fileName || `gorsel-${Date.now()}.jpg`,
            createdAt: Timestamp.now(),
        }

        await mediaRef.set(mediaItem)

        return NextResponse.json({
            id: mediaRef.id,
            url: imageBase64,
            alt: mediaItem.alt,
            folder: mediaItem.folder,
            fileName: mediaItem.fileName,
            createdAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error('[API/media/upload] Error:', error)
        return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
    }
}

/**
 * GET /api/media/upload?esnafId=xxx&folder=hero
 * Lists media items for an esnaf, optionally filtered by folder.
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        const { adminDb } = await import('@/lib/firebaseAdmin')

        let query = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('media')
            .orderBy('createdAt', 'desc')
            .limit(50)

        const folder = searchParams.get('folder')
        if (folder && folder !== 'all') {
            query = query.where('folder', '==', folder)
        }

        const snap = await query.get()
        const items = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = d.data()
            return {
                id: d.id,
                url: data.url,
                alt: data.alt || '',
                folder: data.folder || 'genel',
                fileName: data.fileName || '',
                createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
            }
        })

        return NextResponse.json({ items })
    } catch (error) {
        console.error('[API/media/upload] GET Error:', error)
        return NextResponse.json({ error: 'Medya listelenemedi', items: [] }, { status: 500 })
    }
}

/**
 * DELETE /api/media/upload
 * Removes a media item.
 */
export async function DELETE(req: NextRequest) {
    try {
        const { esnafId, mediaId } = await req.json()

        if (!esnafId || !mediaId) {
            return NextResponse.json({ error: 'esnafId ve mediaId gerekli' }, { status: 400 })
        }

        const { adminDb } = await import('@/lib/firebaseAdmin')
        await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('media')
            .doc(mediaId)
            .delete()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[API/media/upload] DELETE Error:', error)
        return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
    }
}
