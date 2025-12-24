```markdown
# Selamat Tahun Baru — Untuk Sayangku (dengan Foto & Musik)

Situs statis ini sudah diperbarui untuk mendukung:
- Foto (letakkan file `photo.jpg` atau `photo.webp`)
- Musik latar MP3 (letakkan file `background.mp3`)

Cara pakai
1. Letakkan file-file berikut di folder yang sama:
   - index.html
   - styles.css
   - script.js
   - photo.jpg (ganti nama/format sesuai file Anda)
   - background.mp3 (musik latar)
2. Buka `index.html` di browser atau deploy ke GitHub Pages / Netlify.
3. Karena kebijakan browser terhadap autoplay, musik akan mulai diputar saat pengguna melakukan interaksi (mis. klik "Rayakan Sekarang" atau tombol "Putar Musik").

Catatan teknis
- Format foto yang direkomendasikan: JPEG/WEBP, rasio persegi atau potong ke kotak 1:1 agar tampil rapi.
- Musik: gunakan file MP3 yang dikompres (bitrate 128–192 kbps) agar tetap ringan.
- Jika ingin musik mulai otomatis saat halaman dibuka pada perangkat tertentu, biasanya perlu autoplay permissions; solusi paling andal: minta pengguna menekan tombol pertama kali (sudah disediakan tombol Putar Musik dan Rayakan Sekarang).

Penyesuaian lanjut
- Ingin saya meng-embed file foto/mp3 langsung (base64 inline)? Bisa, tapi ukuran file bisa jadi sangat besar — tidak direkomendasikan untuk file audio panjang.
- Ingin menambahkan tombol download foto/musik, atau memotong/menskala foto otomatis? Saya bisa tambahkan.
``