/**
 * kepenk.ai Service Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. App Shell caching (offline çalışma)
 * 2. Firebase Cloud Messaging arka plan bildirimleri
 * 3. Network-First stratejisi (API), Cache-First (statik varlıklar)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CACHE_NAME = 'kepenk-v2'
const APP_SHELL = [
    '/',
    '/offline.html',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/manifest.json',
]

// ═══════════════════════════════════════════════════════════════════════════════
//  1. INSTALL — App Shell'i cache'e al
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] App Shell cache ediliyor...')
            return cache.addAll(APP_SHELL)
        })
    )
    self.skipWaiting()
})

// ═══════════════════════════════════════════════════════════════════════════════
//  2. ACTIVATE — Eski cache'leri temizle
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => {
                        console.log('[SW] Eski cache siliniyor:', key)
                        return caches.delete(key)
                    })
            )
        )
    )
    self.clients.claim()
})

// ═══════════════════════════════════════════════════════════════════════════════
//  3. FETCH — Network First (API), Stale-While-Revalidate (statik)
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // API istekleri — sadece network, offline'da cache'ten
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request).catch(() =>
                new Response(JSON.stringify({ error: 'Çevrimdışı' }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' },
                })
            )
        )
        return
    }

    // _next/static — Cache First (immutable hash'li dosyalar)
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached
                return fetch(request).then((response) => {
                    const clone = response.clone()
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
                    return response
                })
            })
        )
        return
    }

    // Diğer — Network First, offline'da App Shell
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Başarılı response'ı cache'e al
                if (response.ok && request.method === 'GET') {
                    const clone = response.clone()
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
                }
                return response
            })
            .catch(async () => {
                const cached = await caches.match(request)
                if (cached) return cached

                // HTML isteklerinde offline sayfası göster
                if (request.headers.get('accept')?.includes('text/html')) {
                    return caches.match('/offline.html')
                }

                return new Response('Çevrimdışı', { status: 503 })
            })
    )
})

// ═══════════════════════════════════════════════════════════════════════════════
//  4. PUSH — Firebase Cloud Messaging Arka Plan Bildirimleri
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('push', (event) => {
    let data = {}

    try {
        data = event.data?.json() || {}
    } catch {
        data = { notification: { title: 'Kepenk.ai', body: event.data?.text() || 'Yeni bildirim' } }
    }

    const notification = data.notification || {}
    const title = notification.title || 'Kepenk.ai'
    const options = {
        body: notification.body || 'Yeni bir güncelleme var',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: data.data?.tag || 'kepenk-default',
        vibrate: [200, 100, 200],
        data: {
            url: data.data?.url || '/dashboard',
            esnafId: data.data?.esnafId || null,
        },
        actions: [
            { action: 'open', title: 'Aç' },
            { action: 'dismiss', title: 'Kapat' },
        ],
    }

    event.waitUntil(self.registration.showNotification(title, options))
})

// ═══════════════════════════════════════════════════════════════════════════════
//  5. NOTIFICATION CLICK — Bildirime tıklandığında aç
// ═══════════════════════════════════════════════════════════════════════════════

self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    if (event.action === 'dismiss') return

    const targetUrl = event.notification.data?.url || '/dashboard'

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
            // Zaten açık pencere varsa ona odaklan
            for (const client of clients) {
                if (client.url.includes('/dashboard') && 'focus' in client) {
                    client.navigate(targetUrl)
                    return client.focus()
                }
            }
            // Yoksa yeni pencere aç
            return self.clients.openWindow(targetUrl)
        })
    )
})
