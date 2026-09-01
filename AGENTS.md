# AGENTS.md — Aquarium Tank Stocking Calculator 🐠

Panduan kerja untuk agent/dev. Baca PRD.md, SRS.md, DESIGN.md dulu sebelum coding.

## 1. Prioritas Kerja (urutan wajib)

1. Data preset species + tipe data (fondasi) — di file terpisah, immutable.
2. Calculator/status logic murni (pure function, tanpa DOM) — ini jantung Completeness & Technical+Craft.
3. State/store (add/remove/reset fish, set gallons) — terpisah dari render.
4. UI rendering + DESIGN.md token — terapkan anti-slop rules.
5. Loading/error/empty state — jangan ditunda.
6. Test file — tulis paralel dengan logic kalkulasi (paling kritikal untuk dites).
7. Cek ukuran total source sebelum commit final.

## 2. Struktur File (wajib dipecah)

```
/index.html
/src
  /types.ts               # Species, TankFish, StockStatus, TankState
  /species.ts               # konstanta SPECIES: Species[] (preset list)
  /calculator.ts             # pure function: getTotalInches, getRatio, getStockStatus, getHeadroom
  /store.ts                   # state management: setGallons, addFish, removeFish, resetTank, subscribe
  /validate.ts                  # validasi input gallon (positive number, no NaN)
  /render
    /statusPanel.ts               # angka besar, water-level bar, label status
    /fishForm.ts                   # input gallon + dropdown species + tombol add
    /fishList.ts                     # render list ikan + empty state
    /states.ts                        # loading skeleton & error banner
  /main.ts                             # entry point, wire semua modul
/tests
  calculator.test.ts
  store.test.ts
  validate.test.ts
```

> `calculator.ts` harus 100% pure function (input → output, tanpa side effect) supaya gampang dites & jadi bukti kualitas kode di Technical+Craft.

## 3. Aturan Teknis Non-Negotiable

- TypeScript strict mode.
- Styling: Tailwind via CDN — jangan build pipeline berat.
- **Dilarang** kalkulasi ratio langsung di file render — wajib lewat `calculator.ts`.
- Semua input gallon divalidasi sebelum masuk kalkulasi (cegah NaN/Infinity/negative lolos ke `getStockStatus`).
- ID ikan pakai `crypto.randomUUID()`.
- State reaktif pub-sub manual sederhana di `store.ts`, tidak perlu framework.
- No `console.log` tertinggal, no unused import.

## 4. Budget Ukuran (ketat!)

Target 15–20KB raw source, hard cap 25KB. Checklist:

- [ ] Tidak ada dependency npm besar di-bundle.
- [ ] Tidak ada asset gambar (pakai emoji/SVG inline).
- [ ] Cek: `du -cb src/*.ts index.html | tail -1` < 25000 bytes.
- [ ] Jika lewat: konsolidasi util kecil, pangkas komentar berlebih (bukan logic/test).

## 5. Definition of Done (checklist final)

- [ ] FR-1 s/d FR-10 (SRS §3) berfungsi & terdemokan.
- [ ] Loading, ready (empty & filled), error state ketiganya bisa dipicu & terlihat benar.
- [ ] Formula status (PRD §7) akurat di semua kombinasi ikan — verifikasi lewat test, bukan hanya visual.
- [ ] Edge case aman: gallon=0/kosong/negatif, hapus semua ikan, reset, remove uid tidak ada.
- [ ] Semua test di `/tests` hijau.
- [ ] Visual sesuai DESIGN.md token (water-level bar, warna status, bukan progress bar generik).
- [ ] Responsive dicek di 3 breakpoint.
- [ ] Tidak ada NaN/Infinity/undefined bocor ke UI.
- [ ] Ukuran source dalam budget §4.

## 6. Prinsip Problem-Solving saat Ambiguitas

- Default species terpilih di dropdown: item pertama (Neon Tetra) — supaya tombol Add tidak pernah stuck karena "belum pilih apa-apa".
- Saat gallon diubah jadi invalid setelah fish list sudah terisi: JANGAN hapus fish list user diam-diam — cukup sembunyikan/nonaktifkan panel status dengan pesan "isi ulang tank size", data ikan tetap aman.
- Rounding tampilan: selalu 1 desimal untuk angka inch/ratio, tapi simpan raw float untuk kalkulasi internal (hindari akumulasi error pembulatan).
- Jangan tanya user untuk keputusan kecil ini — putuskan, beri komentar kode singkat sebagai catatan asumsi, lanjut build.
