# WAR 40 DAY

Program disiplin dan ibadah 40 hari — PWA yang dapat dipasang di Android.

Aplikasi: https://albara011806.github.io/mode-tempur-40-hari/

## Logo
- `logo-terang.png` — logo final tema terang (hitam di atas putih)
- `logo-gelap.png` — logo final tema gelap (emas di atas hitam)
- Ikon PWA (`icon-*.png`, `icon-maskable-*.png`, `apple-touch-icon.png`, `favicon-48.png`) dibuat langsung dari `logo-gelap.png`: dipotong ke batas logo, diskalakan, dan diletakkan di atas latar hitam. Tidak ada perubahan desain, filter, atau SVG rekonstruksi.

## Rilis baru
Naikkan `VERSION` di `sw.js` (dan `APP_VERSION` + `?v=` di `index.html`) agar cache perangkat diperbarui.

## Data
Disimpan di `localStorage` perangkat (kunci `mode_tempur_v2`). Berbagi progres lewat Dashboard › Gambar Pencapaian (PNG per hari atau keseluruhan).
