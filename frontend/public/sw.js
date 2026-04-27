const CACHE_NAME = 'hms-static-v1'
const PRECACHE_URLS = ['/manifest.json', '/icon-192.png', '/icon-512.png']

const isCacheableAsset = (url) =>
  url.origin === self.location.origin &&
  !url.pathname.startsWith('/api/') &&
  (url.pathname.startsWith('/_next/static/') ||
    url.pathname === '/manifest.json' ||
    url.pathname === '/favicon.ico' ||
    url.pathname === '/icon-192.png' ||
    url.pathname === '/icon-512.png')

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
    ])
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  if (!isCacheableAsset(url)) {
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)
      const networkResponse = fetch(event.request).then((response) => {
        if (response.ok) {
          cache.put(event.request, response.clone())
        }
        return response
      })

      if (cachedResponse) {
        event.waitUntil(networkResponse.catch(() => undefined))
        return cachedResponse
      }

      return networkResponse
    })
  )
})
