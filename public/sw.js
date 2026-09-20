const CACHE = 'purbalink-v6-2-shorts-20260920';
const ASSETS = ['/', '/index.html', '/video.html', '/v2.js', '/v2.css', '/info.css', '/manifest.json', '/icon-192.png', '/icon-512.png'];
const PRIVATE_PATH = /^\/(?:api(?:\/|$)|admin(?:[\/-]|$)|login(?:\.html)?$|register(?:\.html)?$|profile(?:\.html)?$)/;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => Promise.allSettled(ASSETS.map(async path => {
    const response = await fetch(path, {cache: 'reload'});
    if (response.ok && !response.redirected) await cache.put(path, response);
  }))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('purbalink-') && key !== CACHE)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
function cacheable(response) {
  return response.ok && !response.redirected && !/no-store|private/i.test(response.headers.get('cache-control') || '');
}
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  // Never cache API, admin, authentication or personalized responses.
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      self.location.hostname === 'admin.purbalink.web.id' || PRIVATE_PATH.test(url.pathname) ||
      request.headers.has('authorization')) return;
  const navigation = request.mode === 'navigate';
  const fresh = navigation || /\.(?:js|css|html|json)$/.test(url.pathname);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (!fresh) {
      const cached = await cache.match(request);
      if (cached) return cached;
    }
    try {
      const response = await fetch(request, fresh ? {cache: 'no-cache'} : undefined);
      if (cacheable(response) && !url.search) {
        const copy = response.clone();
        event.waitUntil(cache.put(request, copy));
      }
      return response;
    } catch {
      return await cache.match(request) || (navigation && await cache.match('/index.html')) ||
        new Response(navigation ? 'Anda sedang offline. Hubungkan internet lalu coba lagi.' : 'Offline', {
          status: 503, headers: {'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store'}
        });
    }
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    for (const client of list) if ('focus' in client) return client.focus();
    return self.clients.openWindow('/');
  }));
});
