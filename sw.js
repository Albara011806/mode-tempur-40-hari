// WAR 40 DAY service worker — naikkan VERSION setiap rilis agar cache diperbarui.
const VERSION = 'war-40-day-v25';
// Data Al-Qur'an disimpan di cache terpisah agar tidak terhapus saat aplikasi diperbarui.
const QURAN = 'war-quran-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './logo-terang.png', './logo-gelap.png',
  './icon-192.png', './icon-512.png', './icon-maskable-192.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-48.png',
  './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css',
  './vendor/fonts/NotoNaskhArabic-Regular.woff'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== QURAN).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

// Ketuk notifikasi: "✓ Sudah" mencentang kebiasaan, selain itu membuka halaman terkait.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const d = e.notification.data || {};
  const done = e.action === 'done' && d.habit != null;
  const msg = done ? { type: 'done', habit: d.habit, d: d.d } : { type: 'open', tab: d.tab || 'dashboard', d: d.d };
  const url = './?' + (done ? 'done=' + d.habit + '&d=' + d.d + '&tab=harian' : 'tab=' + (d.tab || 'dashboard') + (d.d ? '&d=' + d.d : ''));
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const c = list.find(w => w.url.includes(self.registration.scope));
    if (c) { c.postMessage(msg); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Al-Qur'an: cache dulu (teks tidak berubah), simpan permanen.
  if (url.pathname.includes('/quran/')) {
    e.respondWith(
      caches.open(QURAN).then(cache => cache.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => { if (r.ok) cache.put(req, r.clone()); return r; })))
    );
    return;
  }

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
