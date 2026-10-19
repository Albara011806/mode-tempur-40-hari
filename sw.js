// WAR 40 DAY service worker — naikkan VERSION setiap rilis agar cache diperbarui.
const VERSION = 'war-40-day-v23';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './logo-terang.png', './logo-gelap.png',
  './icon-192.png', './icon-512.png', './icon-maskable-192.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-48.png',
  './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Halaman: jaringan dulu (agar update cepat), cadangan ke cache saat offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        if (r.ok) { const c = r.clone(); caches.open(VERSION).then(cache => cache.put('./index.html', c)); }
        return r;
      }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Aset: jaringan dulu, simpan salinan; offline → cache (abaikan query ?v=).
  e.respondWith(
    fetch(req).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(VERSION).then(cache => cache.put(req, c)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
