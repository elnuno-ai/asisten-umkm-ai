
    function appData() {
      return {
        activeTab: 'prompts',
        activeBab: 0,
        isPremium: false,
        showUnlockModal: false,
        licenseInput: '',
        copiedPromptIdx: null,
        caraPakaiOpen: true,

        // KODE AKTIVASI RAHASIA KAMU (Bisa kamu ganti sendiri)
        SECRET_KEY: 'UMKM2026',

        initApp() {
          // Cek apakah browser sudah mengingat status pembayaran
          if (localStorage.getItem('umkm_ai_premium') === 'true') {
            this.isPremium = true;
          }
          // Cara Pakai: collapsed jika sudah pernah onboarded
          if (localStorage.getItem('umkm_onboarded') === 'true') {
            this.caraPakaiOpen = false;
          }
        },

        switchTab(tab) {
          this.activeTab = tab;
          this.copiedPromptIdx = null;
        },

        toggleCaraPakai() {
          this.caraPakaiOpen = !this.caraPakaiOpen;
          if (!this.caraPakaiOpen) {
            localStorage.setItem('umkm_onboarded', 'true');
          }
        },

        daftarBab: [
          {
            title: "Bab 1: Riset Pasar",
            desc: "Pahami siapa calon pembeli dan bukti lapangan sebelum berjualan.",
            prompts: [
              {
                name: "Prompt Hipotesis & Profil Pasar",
                guide: "Isi data usahamu untuk menggali profil calon pembeli.",
                fields: {
                  jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Kuliner Sarapan", value: "" },
                  lokasi: { label: "Area / Lokasi", placeholder: "misal: Perumahan Sedhah Ayu", value: "" },
                  target: { label: "Target Pembeli", placeholder: "misal: Pekerja kantor & Ibu rumah tangga", value: "" }
                },
                template: "Bantu saya memahami pasar untuk ide usaha {jenisUsaha} di {lokasi} dengan target {target}.\n1. Hipotesis awal kebutuhan mereka\n2. Profil calon pelanggan\n3. Daftar pertanyaan wawancara\n4. Hal yang perlu diobservasi\n5. Daftar pesaing lokal."
              }
            ]
          },
          {
            title: "Bab 2: Needs & Wants",
            desc: "Gali kebutuhan dasar dan preferensi spesifik pelanggan.",
            prompts: [
              {
                name: "Prompt Pemeta Needs & Wants",
                guide: "Membedakan apa yang mereka butuhkan vs apa yang mereka inginkan.",
                fields: {
                  jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
                  produk: { label: "Produk/Layanan", placeholder: "misal: Paket Makan Siang Kantor", value: "" }
                },
                template: "Saya memiliki usaha {jenisUsaha} dengan produk {produk}. Bantu saya memahami kebutuhan dasar (needs) mereka dan preferensi spesifik (wants) yang penting saat memilih produk saya."
              }
            ]
          },
          {
            title: "Bab 3: Keunggulan Kompetitif",
            desc: "Temukan pembeda usahamu agar tidak sekadar perang harga.",
            prompts: [
              {
                name: "Prompt Pembeda Usaha",
                guide: "Temukan keunggulan kompetitif usahamu agar tidak sekadar perang harga.",
                fields: {
                  jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
                  produkUnggulan: { label: "Produk/Layanan Unggulan", placeholder: "misal: Paket Makan Siang Kantor", value: "" },
                  pesaingUtama: { label: "Pesaing Utama", placeholder: "misal: Katering sekitar kantor, warteg", value: "" }
                },
                template: "Saya memiliki usaha {jenisUsaha} dengan produk unggulan {produkUnggulan}. Pesaing utama saya adalah {pesaingUtama}. Bantu saya menemukan keunggulan kompetitif yang sulit ditiru pesaing:\n1. Analisis kekuatan dan kelemahan pesaing\n2. Identifikasi pembeda unik usaha saya\n3. Strategi positioning yang tepat\n4. Cara mengkomunikasikan keunggulan ke pelanggan\n5. Hal yang harus dihindari agar tidak sekadar perang harga."
              }
            ]
          },
          {
            title: "Bab 4: Marketing",
            desc: "Susun strategi pemasaran yang efektif untuk usahamu.",
            prompts: [
              {
                name: "Prompt Strategi Marketing",
                guide: "Susun strategi pemasaran yang efektif untuk usahamu.",
                fields: {
                  jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
                  produk: { label: "Produk/Layanan", placeholder: "misal: Paket Makan Siang Kantor", value: "" },
                  targetPembeli: { label: "Target Pembeli", placeholder: "misal: Pekerja kantor", value: "" },
                  channel: { label: "Channel Pemasaran", placeholder: "misal: Instagram, WhatsApp, TikTok", value: "" }
                },
                template: "Saya memiliki usaha {jenisUsaha} yang menjual {produk} kepada {targetPembeli}. Channel pemasaran yang saya gunakan: {channel}. Bantu saya menyusun strategi marketing:\n1. Pesan utama (value proposition) yang menarik target pembeli\n2. Channel pemasaran yang paling efektif dan cara memaksimalkannya\n3. Konten yang resonan dengan target pembeli\n4. Strategi promosi yang sesuai budget UMKM\n5. Metrik keberhasilan dan cara mengukurnya\n6. Rencana 30 hari untuk meningkatkan visibilitas dan penjualan."
              }
            ]
          },
          {
            title: "Bab 5: Customer Experience",
            desc: "Kelola pengalaman pelanggan agar mereka kembali.",
            prompts: [
              {
                name: "Prompt Customer Experience",
                guide: "Kelola pengalaman pelanggan agar mereka kembali.",
                fields: {
                  jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
                  pertanyaanUmum: { label: "Pertanyaan Umum Pelanggan", placeholder: "misal: Harga, cara pesan, jam operasional", value: "" },
                  masalahAnonim: { label: "Masukan/Masalah (sudah dianonimkan)", placeholder: "misal: Pesanan terlambat, rasa kurang pas", value: "" }
                },
                template: "Saya menjalankan usaha {jenisUsaha}. Pelanggan sering bertanya tentang {pertanyaanUmum} dan pernah memberi masukan seperti {masalahAnonim}. Bantu saya mengelompokkan masukan, membuat perbaikan pengalaman pelanggan, menyusun dan membuat pesan tindak lanjut yang sopan dan tidak memaksa."
              }
            ]
          }
        ],

        bonusList: [
          {
            type: "calculator",
            title: "Kalkulator HPP Otomatis",
            desc: "Hitung harga pokok penjualan per unit. Isi biaya per batch dan jumlah unit, lalu lihat HPP, harga jual saran, dan profit.",
            url: "https://drive.google.com/drive/folders/1IJzK5Vnbg-AZ8VN5vBS1_HhTuWqCkfpQ?usp=sharing",
            icon: "fa-solid fa-calculator",
            fields: {
              bahanBaku: { label: "Biaya Bahan Baku (per batch)", placeholder: "misal: 500000", value: "" },
              tenagaKerja: { label: "Biaya Tenaga Kerja (per batch)", placeholder: "misal: 200000", value: "" },
              overhead: { label: "Biaya Overhead (per batch)", placeholder: "misal: 100000", value: "" },
              jumlahUnit: { label: "Jumlah Unit per Batch", placeholder: "misal: 100", value: "" },
              margin: { label: "Margin yang Diinginkan (%)", placeholder: "misal: 30", value: "" }
            },
            result: null
          },
          {
            type: "prompt",
            title: "Prompt WA Customer Service",
            guide: "Template respons WhatsApp untuk customer service.",
            fields: {
              jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
              namaBrand: { label: "Nama Brand", placeholder: "misal: Dapur Mama", value: "" },
              toneKomunikasi: { label: "Tone Komunikasi", placeholder: "misal: Ramah, profesional", value: "" }
            },
            template: "Usaha saya adalah {jenisUsaha} dengan brand {namaBrand}. Tone komunikasi yang diinginkan: {toneKomunikasi}. Bantu saya membuat template respons WhatsApp untuk customer service:\n1. Sambutan pembuka (greeting)\n2. Respons pertanyaan harga/produk\n3. Respons ketersediaan stok\n4. Respons cara pemesanan\n5. Respons komplain dan permintaan maaf\n6. Penutup dan follow-up."
          },
          {
            type: "prompt",
            title: "Prompt WA Marketing",
            guide: "Template pesan WhatsApp untuk promosi dan marketing.",
            fields: {
              produk: { label: "Produk yang Dipromosikan", placeholder: "misal: Paket Makan Siang Kantor", value: "" },
              promo: { label: "Promo yang Berjalan", placeholder: "misal: Diskon 10% untuk pesanan 5 box", value: "" },
              targetPembeli: { label: "Target Pembeli", placeholder: "misal: Pekerja kantor", value: "" }
            },
            template: "Produk yang dipromosikan: {produk}. Promo yang sedang berjalan: {promo}. Target pembeli: {targetPembeli}. Bantu saya membuat template pesan WhatsApp untuk marketing:\n1. Pesan broadcast promo (singkat dan menarik)\n2. Pesan personal untuk pelanggan lama\n3. Pesan follow-up untuk yang belum beli\n4. Pesan upsell/cross-sell\n5. Pesan testimoni dan social proof."
          },
          {
            type: "prompt",
            title: "Prompt Checklist Aksi 7 Hari Persiapan Bisnis",
            guide: "Susun checklist aksi 7 hari untuk mempersiapkan bisnis baru atau meluncurkan produk baru.",
            fields: {
              jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian, Toko Roti", value: "" },
              produk: { label: "Produk/Layanan", placeholder: "misal: Paket Makan Siang, Roti Artisan", value: "" },
              targetPembeli: { label: "Target Pembeli", placeholder: "misal: Pekerja kantor, Ibu rumah tangga", value: "" },
              budget: { label: "Budget Persiapan", placeholder: "misal: Rp 500.000, Rp 1.000.000", value: "" },
              waktuLuang: { label: "Waktu yang Tersedia per Hari", placeholder: "misal: 2 jam, 4 jam", value: "" }
            },
            template: "Saya akan memulai/meluncurkan usaha dengan detail berikut:\n- Jenis usaha: {jenisUsaha}\n- Produk/layanan: {produk}\n- Target pembeli: {targetPembeli}\n- Budget persiapan: {budget}\n- Waktu yang tersedia per hari: {waktuLuang}\n\nBantu saya menyusun checklist aksi 7 hari untuk mempersiapkan bisnis ini dengan format berikut:\n\nHARI 1 â€” Riset & Validasi:\n- [ ] Tentukan niche dan target pasar spesifik\n- [ ] Riset 3 pesaing terdekat (harga, kekuatan, kelemahan)\n- [ ] Wawancara 5 calon pelanggan (pertanyaan kunci)\n- [ ] Validasi ide dengan pre-order atau survei\n- Output: 1 paragraf kesimpulan riset\n\nHARI 2 â€” Produk & HPP:\n- [ ] Tentukan spesifikasi produk (bahan, ukuran, kualitas)\n- [ ] Hitung HPP (bahan baku, tenaga kerja, overhead)\n- [ ] Tentukan harga jual dan margin\n- [ ] Buat 1 prototipe / sample produk\n- Output: HPP per unit dan harga jual saran\n\nHARI 3 â€” Branding & Identitas:\n- [ ] Pilih nama bisnis yang mudah diingat\n- [ ] Buat logo sederhana (Canva)\n- [ ] Tentukan warna brand (2-3 warna)\n- [ ] Buat tagline (1 kalimat)\n- Output: Nama, logo, warna, tagline\n\nHARI 4 â€” Channel & Setup:\n- [ ] Buat akun media sosial (IG, TikTok, WA Business)\n- [ ] Siapkan template chat WhatsApp (greeting, katalog, harga)\n- [ ] Buat Google Business Profile (jika ada lokasi fisik)\n- [ ] Siapkan metode pembayaran (transfer, QRIS, COD)\n- Output: Semua channel siap digunakan\n\nHARI 5 â€” Konten & Foto:\n- [ ] Foto produk (minimal 5 foto: flat lay, close-up, lifestyle, packaging, behind the scene)\n- [ ] Edit foto (Snapseed/Canva)\n- [ ] Tulis caption untuk 3 postingan pertama\n- [ ] Siapkan hashtag (10-15 hashtag)\n- Output: 5 foto + 3 caption + hashtag\n\nHARI 6 â€” Soft Launch:\n- [ ] Posting konten pertama di media sosial\n- [ ] Kirim pesan ke 10 orang terdekat (keluarga, teman, tetangga)\n- [ ] Tawarkan promo soft launch (diskon/bonus untuk 5 pembeli pertama)\n- [ ] Minta testimoni dari pembeli pertama\n- Output: Minimal 3 pesanan pertama\n\nHARI 7 â€” Evaluasi & Rencana:\n- [ ] Review hasil 6 hari (berapa pesanan, feedback, masalah)\n- [ ] Identifikasi 3 hal yang berhasil dan 3 hal yang perlu diperbaiki\n- [ ] Susun rencana minggu depan (konten, promosi, perbaikan)\n- [ ] Tetapkan target minggu depan (jumlah pesanan, follower, review)\n- Output: Laporan singkat + rencana minggu 2\n\nBONUS: Checklist peralatan minimal (sesuai budget):\n- HP dengan kamera yang layak\n- Kain/tekstur untuk background foto\n- Lampu (natural atau lampu meja)\n- Kemasan produk (plastik, box, stiker)\n- Alat tulis / catatan keuangan"
          },
        ],

        premiumList: [
          {
            type: "prompt",
            name: "Prompt Audit Google Business Profile",
            guide: "Audit mandiri profil Google Business kamu. Isi semua data agar AI menghasilkan checklist, scoring, dan rekomendasi perbaikan yang spesifik.",
            fields: {
              namaBisnis: { label: "Nama Bisnis", placeholder: "misal: Dapur Mama Catering", value: "" },
              kategori: { label: "Kategori Bisnis (di GBP)", placeholder: "misal: Katering, Restoran, Toko Roti", value: "" },
              lokasi: { label: "Kota / Area Layanan", placeholder: "misal: Jakarta Selatan", value: "" },
              jamOperasional: { label: "Jam Operasional", placeholder: "misal: Senin-Sabtu 08:00-17:00", value: "" },
              jumlahFoto: { label: "Jumlah Foto di Profil", placeholder: "misal: 5 foto", value: "" },
              jumlahReview: { label: "Jumlah Review", placeholder: "misal: 12 review", value: "" },
              ratingRataRata: { label: "Rating Rata-rata", placeholder: "misal: 4.5 bintang", value: "" },
              deskripsiSaatIni: { label: "Deskripsi Profil Saat Ini (jika ada)", placeholder: "misal: Katering sehat untuk kantor", value: "" }
            },
            template: "Saya memiliki bisnis Google Business Profile dengan data berikut:\n- Nama bisnis: {namaBisnis}\n- Kategori: {kategori}\n- Lokasi/area layanan: {lokasi}\n- Jam operasional: {jamOperasional}\n- Jumlah foto di profil: {jumlahFoto}\n- Jumlah review: {jumlahReview}\n- Rating rata-rata: {ratingRataRata}\n- Deskripsi profil saat ini: {deskripsiSaatIni}\n\nBantu saya melakukan self-audit Google Business Profile dengan format berikut:\n\n1. CHECKLIST KELENGKAPAN (beri skor 0/1 per item):\n   - Nama bisnis sesuai nama resmi\n   - Kategori utama tepat dan spesifik\n   - Alamat / area layanan lengkap\n   - Nomor telepon aktif\n   - Website / link booking\n   - Jam operasional terisi dan akurat\n   - Deskripsi bisnis (min 250 karakter, mengandung kata kunci)\n   - Minimal 10 foto (logo, cover, produk, interior, tim)\n   - Atribut bisnis (pembayaran, aksesibilitas, dll)\n   - Produk/layanan terdaftar\n\n2. SKOR TOTAL (X/10) dan kategori: Lemah / Cukup / Baik / Excellent\n\n3. EVALUASI PER ASPEK (beri penilaian dan rekomendasi):\n   - Visibilitas (apakah mudah ditemukan di pencarian lokal?)\n   - Kepercayaan (apakah profil terlihat profesional dan terpercaya?)\n   - Konversi (apakah profil mendorong pelanggan untuk menghubungi/memesan?)\n\n4. REKOMENDASI PRIORITAS (urutkan dari yang paling penting):\n   - 3 tindakan segera (minggu ini)\n   - 3 tindakan jangka pendek (bulan ini)\n   - 3 tindakan jangka panjang (3 bulan ke depan)\n\n5. TEMPLATE DESKRIPSI SEO (tulis ulang deskripsi profil yang optimal, max 750 karakter, mengandung kata kunci lokal)\n\n6. STRATEGI REVIEW (cara mendapatkan 5 review positif dalam 2 minggu)\n\n7. IDE POSTINGAN GBP (5 ide postingan yang bisa langsung dibuat)"
          },
          {
            type: "prompt",
            name: "Prompt Foto Produk Profesional",
            guide: "Siapkan foto terbaik produk Anda, lampirkan bersamaan dengan salinan prompt AI. AI akan merubahnya menjadi lebih profesional dan tetap realistis. Isi detail agar AI dapat menghasilkan output yang sesuai imajinasi Anda",
            fields: {
              produk: { label: "Produk yang Difoto", placeholder: "misal: Nasi Box, Kue Tart, Paket Sembako", value: "" },
              platform: { label: "Platform Posting", placeholder: "misal: Instagram Feed, WhatsApp Status, TikTok", value: "", options: ["Instagram Feed", "Instagram Stories", "WhatsApp Status", "TikTok", "Facebook", "Marketplace"] },
              gaya: { label: "Gaya Foto", placeholder: "", value: "", options: ["Minimalis", "Vintage", "Modern", "Rustic", "Aesthetic", "Bold", "Clean", "Moody"] },
              pencahayaan: { label: "Pencahayaan", placeholder: "", value: "", options: ["Natural (cahaya matahari)", "Studio (lampu buatan)", "Dramatic (kontras tinggi)", "Soft (lembut)", "Warm (hangat)", "Cool (dingin)"] },
              background: { label: "Background", placeholder: "", value: "", options: ["Putih bersih", "Gradient warna", "Tekstur (kayu/marmer)", "Outdoor/alam", "Warna solid", "Transparan"] },
              sudut: { label: "Sudut Foto", placeholder: "", value: "", options: ["Flat lay (dari atas)", "Eye level (sejajar)", "45 derajat", "Close-up (detail)", "Wide angle (luas)", "Macro (sangat dekat)"] },
              suasana: { label: "Suasana/Mood", placeholder: "", value: "", options: ["Mewah", "Casual", "Clean", "Elegan", "Fun", "Profesional", "Homey"] }
            },
             template: "Saya punya foto produk biasa (terlampir). Tolong buat foto produk ini terlihat lebih menarik, creative, dan enak dilihat dengan gaya berikut:\n- Produk: {produk}\n- Platform posting: {platform}\n- Gaya foto: {gaya}\n- Pencahayaan: {pencahayaan}\n- Background: {background}\n- Sudut foto: {sudut}\n- Suasana/mood: {suasana}\n\nTransformasikan foto produk yang saya lampirkan agar:\n1. Produk terlihat lebih menonjol dan profesional\n2. Pencahayaan membuat produk terlihat segar dan menarik\n3. Background mendukung produk tanpa mengganggu\n4. Komposisi dan sudut foto membuat produk terlihat premium\n5. Suasana/mood sesuai dengan gaya yang dipilih\n6. Hasil akhir terlihat seperti foto studio yang creative dan enak dilihat\n\nBerikan juga saran singkat (2-3 kalimat) tentang kenapa transformasi ini membuat produk lebih menarik untuk pembeli."
          },
          {
            type: "prompt",
            name: "Prompt Desain Event Launching Produk",
            guide: "Rancang event launching produk dari konsep hingga follow-up. Isi detail agar AI menghasilkan timeline dan strategi yang realistis.",
            fields: {
              produk: { label: "Produk yang Diluncurkan", placeholder: "misal: Menu Baru Paket Hemat, Produk Skincare", value: "" },
              tanggalLaunch: { label: "Tanggal Launching", placeholder: "misal: 15 Maret 2026", value: "" },
              targetAudience: { label: "Target Audience", placeholder: "misal: Pekerja kantor area Sudirman", value: "" },
              budget: { label: "Budget Event", placeholder: "misal: Rp 500.000, Rp 0 (online only)", value: "" },
              channel: { label: "Channel Promosi", placeholder: "misal: Instagram, WhatsApp, TikTok, offline", value: "" },
              tujuanEvent: { label: "Tujuan Event", placeholder: "misal: Penjualan, brand awareness, dapat testimoni", value: "" }
            },
            template: "Saya akan meluncurkan produk dengan detail berikut:\n- Produk: {produk}\n- Tanggal launching: {tanggalLaunch}\n- Target audience: {targetAudience}\n- Budget event: {budget}\n- Channel promosi: {channel}\n- Tujuan event: {tujuanEvent}\n\nBantu saya merancang event launching dengan format berikut:\n\n1. KONSEP & TEMA:\n   - Nama event (catchy, mudah diingat)\n   - Tema visual (warna, dekorasi, dress code)\n   - Value proposition utama\n\n2. TIMELINE PERSIAPAN:\n   - H-30: Perencanaan dan budgeting\n   - H-14: Produksi konten dan undangan\n   - H-7: Teaser dan konfirmasi peserta\n   - H-3: Final check dan reminder\n   - H-1: Setup dan rehearsal\n   - H-day: Eksekusi\n   - H+1 to H+7: Follow-up\n\n3. STRATEGI PROMOSI:\n   - Pre-event (teaser, countdown, early bird)\n   - During event (live, stories, hashtag)\n   - Post-event (recap, testimoni, thank you)\n   - Alokasi budget per channel\n\n4. AKTIVITAS INTERAKTIF:\n   - Ice breaker (5 menit)\n   - Product demo / sampling\n   - Q&A session\n   - Giveaway / lucky draw\n   - Photo booth / UGC moment\n\n5. FOLLOW-UP PASCA EVENT:\n   - Template pesan thank you\n   - Cara konversi peserta jadi pembeli\n   - Strategi testimoni dan review\n   - Retargeting untuk yang belum beli\n\n6. METRIK KEBERHASILAN:\n   - Jumlah peserta\n   - Engagement rate\n   - Konversi penjualan\n   - Cost per acquisition\n   - NPS (Net Promoter Score)"
          },
          {
            type: "prompt",
            name: "Prompt Content Plan 30 Hari",
            guide: "Susun jadwal konten sebulan penuh yang terstruktur. Isi detail agar AI menghasilkan kalender konten yang realistis.",
            fields: {
              jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian, Toko Roti", value: "" },
              platform: { label: "Platform Utama", placeholder: "misal: Instagram, TikTok, Facebook", value: "" },
              tujuanKonten: { label: "Tujuan Konten", placeholder: "misal: Meningkatkan penjualan, brand awareness", value: "" },
              frekuensiPosting: { label: "Frekuensi Posting", placeholder: "misal: 1x sehari, 3x seminggu", value: "" },
              targetAudience: { label: "Target Audience", placeholder: "misal: Ibu rumah tangga, pekerja kantor", value: "" },
              jamPosting: { label: "Jam Posting Optimal (jika tahu)", placeholder: "misal: 07:00, 12:00, 19:00", value: "" }
            },
            template: "Saya memiliki usaha dengan detail berikut:\n- Jenis usaha: {jenisUsaha}\n- Platform: {platform}\n- Tujuan konten: {tujuanKonten}\n- Frekuensi posting: {frekuensiPosting}\n- Target audience: {targetAudience}\n- Jam posting optimal: {jamPosting}\n\nBantu saya menyusun content plan 30 hari dengan format berikut:\n\n1. BREAKDOWN TEMA MINGGUAN:\n   - Minggu 1: Awareness (kenalan dengan brand)\n   - Minggu 2: Edukasi (tips, manfaat, behind the scene)\n   - Minggu 3: Engagement (interaksi, polling, UGC)\n   - Minggu 4: Konversi (promo, testimoni, CTA)\n\n2. KALENDER KONTEN 30 HARI (tabel: Hari | Tanggal | Jenis Konten | Tema | Caption Singkat | Hashtag)\n\n3. JENIS KONTEN PER HARI:\n   - Senin: Edukasi (tips/carousel)\n   - Selasa: Behind the scene (video/stories)\n   - Rabu: Promo/produk (feed)\n   - Kamis: Testimoni/UGC (repost)\n   - Jumat: Engagement (polling/Q&A)\n   - Sabtu: Lifestyle (relatable content)\n   - Minggu: Recap/highlight (stories)\n\n4. TEMPLATE CAPTION (5 template yang bisa langsung dipakai):\n   - Template edukasi\n   - Template promo\n   - Template testimoni\n   - Template behind the scene\n   - Template engagement\n\n5. HASHTAG STRATEGY:\n   - 3 hashtag brand (konsisten)\n   - 5 hashtag niche (spesifik)\n   - 5 hashtag lokal (kota/area)\n   - 3 hashtag trending (rotasi)\n\n6. METRIK EVALUASI (apa yang diukur setiap minggu):\n   - Reach & impressions\n   - Engagement rate\n   - Follower growth\n   - Click-through rate\n   - Konversi (DM/pesan masuk)"
          },
          {
            type: "prompt",
            name: "Prompt Growth Akun Medsos 30 Hari",
            guide: "Strategi pertumbuhan akun media sosial yang realistis. Isi detail agar AI menghasilkan rencana yang actionable.",
            fields: {
              akunMedsos: { label: "Akun Media Sosial", placeholder: "misal: @dapurmama.id", value: "" },
              niche: { label: "Niche / Bidang", placeholder: "misal: Katering sehat, Toko roti rumahan", value: "" },
              platform: { label: "Platform Utama", placeholder: "misal: Instagram, TikTok", value: "" },
              followerSaatIni: { label: "Follower Saat Ini", placeholder: "misal: 500", value: "" },
              targetFollower: { label: "Target Follower (30 hari)", placeholder: "misal: 1.000", value: "" },
              budget: { label: "Budget Iklan (jika ada)", placeholder: "misal: Rp 0, Rp 200.000", value: "" },
              waktuLuang: { label: "Waktu yang Bisa Dicurahkan", placeholder: "misal: 1 jam/hari, 3 jam/minggu", value: "" }
            },
            template: "Akun media sosial saya dengan detail berikut:\n- Akun: {akunMedsos}\n- Niche: {niche}\n- Platform: {platform}\n- Follower saat ini: {followerSaatIni}\n- Target follower 30 hari: {targetFollower}\n- Budget iklan: {budget}\n- Waktu yang bisa dicurahkan: {waktuLuang}\n\nBantu saya menyusun strategi growth 30 hari dengan format berikut:\n\n1. OPTIMASI PROFIL (checklist):\n   - Username yang mudah dicari\n   - Bio yang jelas (siapa, apa, untuk siapa, CTA)\n   - Foto profil profesional\n   - Highlight stories (minimal 3: Produk, Testimoni, FAQ)\n   - Link di bio (WhatsApp / linktree)\n\n2. STRATEGI KONTEN (untuk menarik follower baru):\n   - 3 jenis konten yang paling efektif untuk niche ini\n   - Format yang diprioritaskan (Reels/TikTok > Carousel > Static)\n   - Hook (kalimat pembuka) yang menarik perhatian\n   - CTA yang mendorong follow\n\n3. TEKNIK ENGAGEMENT (untuk meningkatkan interaksi):\n   - Cara merespons komentar (template respons)\n   - Strategi DM (welcome message, follow-up)\n   - Kolaborasi dengan akun sejenis (cara approach)\n   - Engagement dengan akun target (komentar bermakna)\n\n4. JADWAL POSTING:\n   - Hari dan jam optimal (berdasarkan niche)\n   - Frekuensi per minggu\n   - Rasio konten (edukasi : promo : engagement : behind the scene)\n\n5. TARGET MINGGUAN:\n   - Minggu 1: X follower (fokus optimasi profil)\n   - Minggu 2: X follower (fokus konten viral)\n   - Minggu 3: X follower (fokus engagement)\n   - Minggu 4: X follower (fokus konversi)\n\n6. METRIK YANG DIUKUR:\n   - Follower growth rate\n   - Engagement rate\n   - Reach per post\n   - Profile visits\n   - Website/DM clicks\n\n7. RED FLAGS (hal yang harus dihindari):\n   - Beli follower\n   - Follow-unfollow massal\n   - Konten yang tidak relevan\n   - Spam hashtag"
          },
          {
            type: "prompt",
            name: "Marketing Mix 4P",
            guide: "Susun marketing mix (Product, Price, Place, Promotion) yang lengkap dan terintegrasi untuk usahamu.",
            fields: {
              jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
              produk: { label: "Produk/Layanan", placeholder: "misal: Paket Makan Siang Kantor", value: "" },
              pelanggan: { label: "Target Pelanggan", placeholder: "misal: Pekerja kantor", value: "" },
              area: { label: "Area / Lokasi", placeholder: "misal: Jakarta Selatan", value: "" },
              harga: { label: "Harga Jual per Unit", placeholder: "misal: Rp 25.000", value: "" },
              biaya: { label: "Perkiraan Biaya per Unit", placeholder: "misal: Rp 15.000", value: "" },
              saluran: { label: "Saluran Penjualan", placeholder: "misal: WhatsApp, Instagram, GoFood", value: "" },
              masalah: { label: "Masalah Pemasaran", placeholder: "misal: Kurang pelanggan, persaingan harga", value: "" }
            },
            template: "Bantu saya menyusun marketing mix untuk usaha {jenisUsaha} yang menjual {produk} kepada {pelanggan} di {area}.\nKondisi saat ini: harga jual {harga},\nperkiraan biaya per unit {biaya},\nsaluran penjualan {saluran},\ndan masalah pemasaran {masalah}.\n\nSusun marketing mix (4P) yang lengkap dan terintegrasi:\n\n1. PRODUCT (Produk):\n   - Fitur dan manfaat utama\n   - Kualitas dan standar\n   - Variasi / lini produk\n   - Packaging dan branding\n   - Diferensiasi dari pesaing\n\n2. PRICE (Harga):\n   - Analisis HPP dan margin\n   - Strategi penetapan harga (cost-plus / value-based / competitive)\n   - Skema diskon dan promo\n   - Kapan dan bagaimana menaikkan harga\n\n3. PLACE (Tempat/Distribusi):\n   - Evaluasi saluran penjualan saat ini\n   - Channel baru yang potensial\n   - Strategi omnichannel\n   - Manajemen stok dan logistik\n\n4. PROMOTION (Promosi):\n   - Pesan utama (value proposition)\n   - Alokasi budget per channel\n   - Kalender promosi 1 bulan\n   - Metrik keberhasilan\n\n5. INTEGRASI 4P:\n   - Bagaimana 4P saling mendukung\n   - Prioritas tindakan (apa yang dilakukan dulu)\n   - Rencana implementasi 30 hari\n\n6. EVALUASI:\n   - KPI yang harus dipantau\n   - Red flags yang harus dihindari\n   - Benchmark keberhasilan"
           },
           {
             type: "prompt",
             name: "Track Customer Experience",
             guide: "Kelola alur pesan, FAQ, dan respons komplain agar pelanggan kembali. Isi detail agar AI menghasilkan strategi customer experience yang komprehensif.",
             fields: {
               jenisUsaha: { label: "Jenis Usaha", placeholder: "misal: Katering Harian", value: "" },
               titikKontak: { label: "Titik Kontak Pelanggan", placeholder: "misal: WhatsApp, Instagram, telepon", value: "" },
               masalahUmum: { label: "Masalah yang Sering Muncul", placeholder: "misal: Pesanan terlambat, salah menu", value: "" },
               volumePelanggan: { label: "Jumlah Pelanggan per Hari", placeholder: "misal: 20-30 pelanggan", value: "" },
               waktuRespon: { label: "Waktu Respon Rata-rata", placeholder: "misal: 5 menit, 1 jam", value: "" }
             },
             template: "Usaha saya adalah {jenisUsaha}. Titik kontak dengan pelanggan: {titikKontak}. Masalah yang sering muncul: {masalahUmum}. Volume pelanggan per hari: {volumePelanggan}. Waktu respon rata-rata: {waktuRespon}.\n\nBantu saya menyusun strategi customer experience:\n\n1. PETA PERJALANAN PELANGGAN (Customer Journey Map):\n   - Tahap awareness (bagaimana pelanggan menemukan usaha)\n   - Tahap consideration (bagaimana pelanggan memutuskan beli)\n   - Tahap purchase (proses pemesanan)\n   - Tahap delivery (pengiriman/penyajian)\n   - Tahap post-purchase (follow-up dan retention)\n\n2. TEMPLATE RESPONS (untuk setiap titik kontak):\n   - Template sambutan (greeting)\n   - Template konfirmasi pesanan\n   - Template update status\n   - Template penanganan komplain\n   - Template follow-up\n\n3. FAQ (10 pertanyaan yang sering ditanyakan + jawaban):\n   - Pertanyaan tentang harga\n   - Pertanyaan tentang cara pesan\n   - Pertanyaan tentang pengiriman\n   - Pertanyaan tentang pembayaran\n   - Pertanyaan tentang garansi/retur\n\n4. SOP PENANGANAN KOMPLAIN:\n   - Langkah 1: Dengarkan dan akui\n   - Langkah 2: Minta maaf dan empati\n   - Langkah 3: Tawarkan solusi\n   - Langkah 4: Tindak lanjut\n   - Template respons untuk setiap jenis komplain\n\n5. STRATEGI FOLLOW-UP:\n   - Kapan follow-up (1 hari, 3 hari, 7 hari setelah pembelian)\n   - Template pesan follow-up\n   - Cara meminta review/testimoni\n   - Strategi loyalty (pelanggan kembali)\n\n6. METRIK CUSTOMER EXPERIENCE:\n   - Response time\n   - Customer satisfaction score (CSAT)\n   - Net Promoter Score (NPS)\n   - Repeat purchase rate\n   - Complaint resolution time"
           },
           {
             type: "link",
             title: "Pencatatan Keuangan Bisnis",
             desc: "Template spreadsheet pencatatan keuangan bisnis.",
            url: "https://drive.google.com/drive/folders/1A6A1wKKWqxHJWQbgyIcLrXthSemD-R7l?usp=drive_link",
            icon: "fa-solid fa-file-invoice-dollar"
          },
          {
            type: "link",
            title: "Template Desain Bisnis Canva",
            desc: "Kumpulan template desain bisnis siap edit di Canva.",
            url: "https://drive.google.com/drive/folders/120U5R7oGkdiF1ZQjVmdgY4ohjmCnpI_Z?usp=sharing",
            icon: "fa-solid fa-palette"
          }
        ],

        buildPrompt(pItem) {
          let text = pItem.template;
          for (let key in pItem.fields) {
            let val = pItem.fields[key].value.trim() !== '' ? pItem.fields[key].value : `[${pItem.fields[key].label}]`;
            text = text.replace(new RegExp(`{${key}}`, 'g'), val);
          }
          return text;
        },

        handleCopyPrompt(pItem, idx) {
          const text = this.buildPrompt(pItem);
          this.performCopy(text, idx);
          this.trackEvent('prompt_copied', { chapter: this.activeTab, prompt_name: pItem.name || pItem.title });
        },

        handlePremiumCopyPrompt(pItem, idx) {
          if (!this.isPremium) {
            this.showUnlockModal = true;
            return;
          }
          const text = this.buildPrompt(pItem);
          this.performCopy(text, idx);
          this.trackEvent('prompt_copied', { chapter: 'premium', prompt_name: pItem.name });
        },

        performCopy(text, idx) {
          const setCopied = () => {
            this.copiedPromptIdx = idx;
            setTimeout(() => { this.copiedPromptIdx = null; }, 2000);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(setCopied).catch(() => {
              this.fallbackCopy(text, setCopied);
            });
          } else {
            this.fallbackCopy(text, setCopied);
          }
        },

        fallbackCopy(text, setCopied) {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            if (document.execCommand('copy')) {
              setCopied();
            } else {
              alert('Gagal menyalin. Silakan salin manual dari preview.');
            }
          } catch (e) {
            alert('Gagal menyalin. Silakan salin manual dari preview.');
          }
          document.body.removeChild(textarea);
        },

        resetFields(pItem) {
          if (pItem.fields) {
            for (let key in pItem.fields) {
              pItem.fields[key].value = '';
            }
          }
          if (pItem.result !== undefined) {
            pItem.result = null;
          }
        },

        calculateHPP(bItem) {
          const bahanBaku = parseFloat(bItem.fields.bahanBaku.value) || 0;
          const tenagaKerja = parseFloat(bItem.fields.tenagaKerja.value) || 0;
          const overhead = parseFloat(bItem.fields.overhead.value) || 0;
          const jumlahUnit = parseFloat(bItem.fields.jumlahUnit.value) || 0;
          const margin = parseFloat(bItem.fields.margin.value) || 0;

          if (jumlahUnit <= 0) {
            alert('Jumlah unit harus lebih dari 0');
            return;
          }

          const totalBiaya = bahanBaku + tenagaKerja + overhead;
          const hppPerUnit = totalBiaya / jumlahUnit;
          const hargaJual = hppPerUnit * (1 + margin / 100);
          const profitPerUnit = hargaJual - hppPerUnit;

          bItem.result = {
            totalBiaya: totalBiaya,
            hppPerUnit: hppPerUnit,
            hargaJual: hargaJual,
            profitPerUnit: profitPerUnit,
            marginPersen: margin
          };
        },

        handleBonusLinkClick(bItem) {
          window.open(bItem.url, '_blank');
          this.trackEvent('tool_clicked', { tab: 'bonus', tool_name: bItem.title });
        },

        handlePremiumLinkClick(pItem) {
          if (!this.isPremium) {
            this.showUnlockModal = true;
            return;
          }
          window.open(pItem.url, '_blank');
          this.trackEvent('tool_clicked', { tab: 'premium', tool_name: pItem.title });
        },

        trackEvent(eventName, params) {
          if (typeof gtag === 'function') {
            gtag('event', eventName, params);
          }
        },

        activateCode() {
          if (this.licenseInput.trim().toUpperCase() === this.SECRET_KEY) {
            this.isPremium = true;
            localStorage.setItem('umkm_ai_premium', 'true');
            this.showUnlockModal = false;
            this.licenseInput = '';
            this.trackEvent('premium_unlocked', {});
            alert('Selamat! Semua fitur Premium telah terbuka.');
          } else {
            alert('Kode Aktivasi Salah/Tidak Valid.');
          }
        }
      }
    }
  
