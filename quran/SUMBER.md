# Sumber data Al-Qur'an

- **Teks Arab (rasm Indonesia) & terjemahan Bahasa Indonesia**: Kementerian Agama RI — https://quran.kemenag.go.id
  diambil dari `renomureza/quran-api-id` (MIT License, © 2021 R.M. Reza), dicocokkan silang dengan `rioastamal/quran-json` (MIT, © 2018 Rio Astamal).
- **Pembagian juz, halaman (mushaf Madinah 604 halaman), tanda sajdah & transliterasi Latin**: alquran.cloud,
  diambil dari `gadingnst/quran-api` (MIT License, © 2020 Gading Nasution).
- **Font Arab**: Noto Naskh Arabic v2.019 — SIL Open Font License 1.1 (lihat `vendor/fonts/OFL.txt`).

Format file `N.json`: `{"n": nomor surat, "b": tampilkan basmalah, "a": [[arab, latin, terjemahan, juz, halaman, sajdah], ...]}`.
Jika menemukan kesalahan teks, mohon laporkan agar dapat diperiksa terhadap mushaf Kemenag.

## Koreksi
- 2026-10-19: kata «اللهم» tanpa harakat pada QS 3:26, 5:114, 8:32, 10:10, 39:46 (cacat pada kedua sumber data) diseragamkan menjadi «اللّٰهُمَّ» sesuai penulisan mushaf Kemenag.
