# PURBALINK V5.9.1

Perbaikan kestabilan dari commit 7dd31fc, sebelum pengembangan CMS V6.0.

- Memperbaiki kurung berlebih pada konfigurasi feed yang membuat seluruh v2.js gagal diparse.
- PWA mengambil HTML, JavaScript dan CSS terbaru dari jaringan, dengan fallback offline. API, admin, login, profil dan respons no-store/private tidak disimpan. Pembaruan cache hanya menghapus cache PURBALINK.
- Worker meminta revalidasi file JS/CSS agar perubahan cepat diterima browser.
- Pemeriksaan integrasi memakai satu GET /api/health; tidak lagi menjalankan generator AI, pencarian Jooble atau pemeriksaan transaksi contoh. Status konfigurasi dibedakan dari keberhasilan koneksi provider.
- Endpoint generator AI dibatasi ke host admin dan email Cloudflare Access yang diizinkan, mengikuti proteksi admin yang sudah ada.
- Pembukaan artikel publik menolak status selain Terbit.
- Memperbaiki pengujian agar JSON-LD tidak dibaca sebagai JavaScript.

Validasi: node scripts/build-media.mjs; node scripts/test-media.mjs; node scripts/test-stability.mjs. Tes media mencakup 73 stiker, komentar/balasan, emoji, reaksi dan fallback GIF. Tes kestabilan memakai mock jaringan; layanan eksternal dan deployment langsung belum diuji.

Batasan: artikel masih disimpan di localStorage dan berbeda antara host admin dan publik. Publikasi server, penjadwalan, revisi terpusat, slug dan sitemap berita dinamis memerlukan penyimpanan server dan migrasi data. Rilis ini tidak mengklaim CMS V6.0 sudah selesai. Cloudflare Access harus tetap melindungi seluruh host admin, termasuk /api/ai/article; pemeriksaan email menggunakan header Access sebagaimana konfigurasi sebelumnya.
