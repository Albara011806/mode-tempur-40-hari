# Sumber data Al-Qur'an

- **Teks Arab (rasm Indonesia) & terjemahan Bahasa Indonesia**: Kementerian Agama RI — https://quran.kemenag.go.id
  diambil dari `renomureza/quran-api-id` (MIT License, © 2021 R.M. Reza), dicocokkan silang dengan `rioastamal/quran-json` (MIT, © 2018 Rio Astamal).
- **Pembagian juz, halaman (mushaf Madinah 604 halaman), tanda sajdah & transliterasi Latin**: alquran.cloud,
  diambil dari `gadingnst/quran-api` (MIT License, © 2020 Gading Nasution).
- **Font Arab**: Noto Naskh Arabic v2.019 — SIL Open Font License 1.1 (lihat `vendor/fonts/OFL.txt`).

Format file `N.json`: `{"n": nomor surat, "b": tampilkan basmalah, "a": [[arab, latin, terjemahan, juz, halaman, sajdah], ...]}`.
Jika menemukan kesalahan teks, mohon laporkan agar dapat diperiksa terhadap mushaf Kemenag.
