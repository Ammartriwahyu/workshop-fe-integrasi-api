# 🛒 Workshop FE — Integrasi API dengan Native Fetch

Di sesi hands-on ini kamu akan menyambungkan **frontend** (tampilan yang dilihat pengguna) dengan **backend** (server yang menyimpan dan mengirim data) lewat **REST API**, memakai `fetch` bawaan browser. Tanpa library tambahan.

Aplikasi yang akan kamu bangun: **Katalog Produk** dengan 3 halaman.

| Halaman | URL | Isi |
| --- | --- | --- |
| Daftar produk | `/` | 10 produk: gambar, nama, harga |
| Detail produk | `/products/[id]` | Info lengkap + ulasan pembeli |
| Tambah produk | `/products/new` | Form untuk mengirim produk baru (POST) |

> Repo ini hanya berisi **starter project**. Kode aplikasinya kamu tulis sendiri dengan mengikuti panduan di bawah, tahap demi tahap.

---

## 📚 Daftar Isi

- [Prasyarat](#prasyarat)
- [Timeline](#timeline)
- [Isi starter](#isi-starter)
- [Struktur folder akhir](#struktur-akhir)
- [Tentang DummyJSON](#dummyjson)
- [Tahap 0 — Persiapan (sebelum sesi)](#tahap-0)
- [Tahap 1 — Kenalan dengan API](#tahap-1)
- [Tahap 2 — Buat .env.local](#tahap-2)
- [Tahap 3 — Buat tipe data](#tahap-3)
- [Tahap 4 — Buat fungsi pemanggil API](#tahap-4)
- [Tahap 5 — Tampilkan daftar produk](#tahap-5)
- [Tahap 6 — Halaman detail + ulasan](#tahap-6)
- [Tahap 7 — Tambah produk dengan POST](#tahap-7)
- [BONUS A — Pencarian produk](#bonus-a)
- [BONUS B — Hapus produk](#bonus-b)
- [Troubleshooting umum](#troubleshooting)
- [Rangkuman & referensi](#rangkuman)

---

<a id="prasyarat"></a>

## ✅ Prasyarat

Pasang ini di laptop kamu **sebelum sesi dimulai**:

| Alat | Versi | Cek dengan perintah |
| --- | --- | --- |
| [Node.js](https://nodejs.org) | **LTS terbaru (disarankan v24)**. Minimal 20.9, syarat dari Next.js 16 | `node -v` |
| npm | ikut terpasang bersama Node.js | `npm -v` |
| [Git](https://git-scm.com) | versi terbaru | `git --version` |
| [VS Code](https://code.visualstudio.com) | versi terbaru | — |

Bekal materi sebelumnya: dasar Next.js (App Router), React + TypeScript, dan Tailwind CSS.

---

<a id="timeline"></a>

## ⏱️ Timeline

Tahap 0 dikerjakan **sebelum** sesi. Tahap 1–7 dikerjakan **saat** sesi, totalnya ± 30 menit.

| Tahap | Durasi | File yang disentuh |
| --- | --- | --- |
| 0 — Persiapan | sebelum sesi | — (clone, install, jalankan) |
| 1 — Kenalan dengan API | ± 3 menit | — (hanya browser) |
| 2 — Buat `.env.local` | ± 2 menit | `.env.local` (baru) |
| 3 — Buat tipe data | ± 3 menit | `src/types/product.ts` (baru) |
| 4 — Fungsi pemanggil API | ± 4 menit | `src/lib/api.ts` (baru) |
| 5 — Daftar produk | ± 8 menit | `src/app/page.tsx` (ubah) |
| 6 — Detail + ulasan | ± 5 menit | `src/app/products/[id]/page.tsx` (baru) |
| 7 — Tambah produk (POST) | ± 5 menit | `src/app/products/new/page.tsx` (baru) |
| **Total** | **± 30 menit** | |
| BONUS A & B | opsional, di luar 30 menit | `src/lib/api.ts`, `src/app/page.tsx`, `src/app/products/[id]/page.tsx` |

---

<a id="isi-starter"></a>

## 📦 Isi starter

Project ini dibuat dengan `create-next-app` (Next.js 16) memakai App Router, folder `src/`, TypeScript, Tailwind CSS, ESLint, dan import alias `@/*`. Yang sudah disiapkan:

- **`next.config.ts`** sudah berisi `images.remotePatterns` untuk domain gambar DummyJSON (`cdn.dummyjson.com`). Komponen `<Image>` dari Next.js menolak gambar dari domain luar yang belum didaftarkan. **Kamu tidak perlu mengubah file ini.**
- **`.env.example`** berisi contoh environment variable. Nanti kamu salin menjadi `.env.local` di Tahap 2.
- **`src/app/page.tsx`** sudah dibersihkan dari template bawaan. Isinya hanya judul "Katalog Produk".
- **`src/app/layout.tsx`** sudah diberi judul tab "Katalog Produk — Workshop FE".
- **`src/app/globals.css`** hanya berisi import Tailwind + style dasar.
- Aset bawaan di folder `public/` sudah dihapus karena tidak dipakai.

Struktur folder awal:

```text
workshop-fe-integrasi-api/
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

---

<a id="struktur-akhir"></a>

## 🗂️ Struktur folder akhir

Setelah Tahap 7 selesai, file yang relevan akan terlihat seperti ini (★ = file yang kamu buat atau ubah):

```text
workshop-fe-integrasi-api/
├── src/
│   ├── app/
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      ★ Tahap 6 — detail produk
│   │   │   └── new/
│   │   │       └── page.tsx      ★ Tahap 7 — form tambah produk
│   │   ├── layout.tsx
│   │   └── page.tsx              ★ Tahap 5 — daftar produk
│   ├── lib/
│   │   └── api.ts                ★ Tahap 4 — semua fungsi fetch
│   └── types/
│       └── product.ts            ★ Tahap 3 — tipe data
├── .env.local                    ★ Tahap 2 — alamat API (tidak di-commit)
└── next.config.ts
```

---

<a id="dummyjson"></a>

## 🌐 Tentang DummyJSON

[DummyJSON](https://dummyjson.com) adalah **API palsu gratis** untuk latihan. Ia berperan sebagai backend: menerima request dan membalas dengan data JSON, tanpa perlu login atau API key.

Satu hal penting: DummyJSON **hanya mensimulasikan** perubahan data. Saat kamu menambah (POST) atau menghapus (DELETE) produk, server membalas seolah-olah berhasil, tapi data aslinya tidak pernah berubah.

| Method | URL | Kegunaan |
| --- | --- | --- |
| `GET` | `https://dummyjson.com/products?limit=10&select=title,price,thumbnail` | Ambil daftar 10 produk |
| `GET` | `https://dummyjson.com/products/1` | Ambil detail 1 produk (sudah termasuk `reviews`) |
| `POST` | `https://dummyjson.com/products/add` | Tambah produk baru (simulasi) |
| `GET` | `https://dummyjson.com/products/search?q=phone` | BONUS A: cari produk |
| `DELETE` | `https://dummyjson.com/products/1` | BONUS B: hapus produk (simulasi) |

---

<a id="tahap-0"></a>

### Tahap 0 — Persiapan (⏱️ sebelum sesi)

**🎯 Tujuan:** Project starter berjalan di laptop kamu, supaya saat sesi kita langsung ngoding.

**📄 Nama file:** — (belum ada file yang dibuat)

**📁 Lokasi:** Terminal. Di VS Code buka lewat menu **Terminal → New Terminal**.

**🧩 Kode:**

```bash
# 1. Unduh (clone) repo ini ke laptop kamu
git clone https://github.com/Ammartriwahyu/workshop-fe-integrasi-api.git

# 2. Masuk ke folder project
cd workshop-fe-integrasi-api

# 3. Pasang semua library yang dibutuhkan (butuh internet, sekitar 1–2 menit)
npm install

# 4. Jalankan server development
npm run dev
```

Lalu buka **http://localhost:3000** di browser.

**🔍 Penjelasan:**

- `git clone` menyalin repo dari GitHub ke laptop kamu.
- `npm install` membaca `package.json` lalu mengunduh semua library ke folder `node_modules`.
- `npm run dev` menyalakan **dev server**, yaitu server lokal untuk development. Selama server ini menyala, setiap kali kamu menyimpan file, browser ikut ter-update otomatis.
- Untuk mematikan dev server, tekan `Ctrl + C` di terminal.
- Buka project di VS Code dengan `code .` (atau **File → Open Folder**).
- Isi starter sudah dijelaskan di bagian [Isi starter](#isi-starter). Ingat: `next.config.ts` sudah diatur untuk gambar DummyJSON, jadi **jangan diubah**.

**✅ Checkpoint:**

- Terminal menampilkan `✓ Ready` dan alamat `http://localhost:3000`.
- Browser menampilkan judul **"Katalog Produk"** dan teks "Ikuti README mulai dari Tahap 1".

**⚠️ Error yang sering muncul:**

1. **`'npm' is not recognized` / `command not found: npm`**. Node.js belum terpasang, atau terminal dibuka sebelum Node.js selesai dipasang. Pasang Node.js LTS, lalu tutup dan buka lagi terminal/VS Code.
2. **`'next' is not recognized` saat `npm run dev`**. Kamu lupa `npm install`. Jalankan `npm install` dulu.
3. **`Port 3000 is in use`**. Lihat [Troubleshooting](#troubleshooting).

---

<a id="tahap-1"></a>

### Tahap 1 — Kenalan dengan API (⏱️ ± 3 menit)

**🎯 Tujuan:** Melihat langsung data yang nanti diambil aplikasi kita, dan paham istilah-istilah dasarnya. Belum ada kode di tahap ini.

**📄 Nama file:** — (tidak ada file)

**📁 Lokasi:** Browser (Chrome/Edge/Firefox).

**🧩 Kode:** buka URL ini di tab baru:

```text
https://dummyjson.com/products?limit=10&select=title,price,thumbnail
```

Hasilnya kurang lebih seperti ini (dipendekkan):

```json
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 10
}
```

**🔍 Penjelasan:**

- **API** (Application Programming Interface) adalah "pintu" yang disediakan backend supaya aplikasi lain bisa meminta atau mengirim data. Ibaratnya pelayan restoran: kamu memesan, pelayan mengantar pesanan ke dapur, lalu kembali membawa makanan.
- **Endpoint** adalah alamat spesifik di API untuk satu keperluan. Contoh: `/products` untuk daftar produk, `/products/1` untuk produk ber-id 1.
- **Query parameter** adalah tambahan setelah tanda `?` di URL, dipisah dengan `&`.
  - `limit=10` → ambil 10 produk saja.
  - `select=title,price,thumbnail` → hanya kirim field itu (plus `id`), supaya datanya kecil.
- **Method** menunjukkan jenis permintaan:
  - `GET` = minta data (membuka URL di browser selalu memakai GET).
  - `POST` = kirim data baru ke server.
- **JSON** (JavaScript Object Notation) adalah format teks untuk bertukar data. Bentuknya mirip objek JavaScript: `{ "kunci": nilai }`.
- **Status code** adalah angka dari server yang menunjukkan hasil permintaan:
  - `200 OK` → berhasil.
  - `201 Created` → data baru berhasil dibuat (balasan POST).
  - `404 Not Found` → data tidak ditemukan. Coba buka https://dummyjson.com/products/99999.
- ⚠️ **Perhatikan baik-baik:** respons ini adalah **objek**, bukan langsung array. Daftar produknya ada **di dalam properti `products`**. Ini akan penting di Tahap 4.
- Arti field lainnya:
  - `total` → jumlah semua produk di server (194).
  - `skip` → berapa produk yang dilewati dari awal (0 = mulai dari produk pertama).
  - `limit` → berapa produk yang dikirim di respons ini (10).

**✅ Checkpoint:** Browser menampilkan data JSON yang berisi `products`, `total`, `skip`, dan `limit`.

**⚠️ Error yang sering muncul:**

1. **JSON tampil sebagai satu baris panjang yang sulit dibaca.** Di Chrome, centang **"Pretty-print"** di bagian atas halaman, atau pasang ekstensi JSON viewer.
2. **Halaman tidak bisa dibuka.** Cek koneksi internet. Kalau memakai jaringan kantor, pastikan `dummyjson.com` tidak diblokir.

---

<a id="tahap-2"></a>

### Tahap 2 — Buat .env.local (⏱️ ± 2 menit)

**🎯 Tujuan:** Menyimpan alamat API di satu tempat (environment variable), supaya tidak ditulis berulang-ulang di kode.

**📄 Nama file:** `.env.local`

**📁 Lokasi:** `.env.local` di **root project** (sejajar dengan `package.json`). **BUAT FILE BARU** dengan menyalin `.env.example`.

**🧩 Kode:**

Matikan dulu dev server (`Ctrl + C`), lalu jalankan **salah satu** perintah ini di terminal:

```powershell
# Windows (PowerShell, terminal bawaan VS Code di Windows)
Copy-Item .env.example .env.local
```

```bat
:: Windows (Command Prompt / CMD)
copy .env.example .env.local
```

```bash
# macOS / Linux / Git Bash
cp .env.example .env.local
```

Cara manual lewat VS Code: klik kanan file `.env.example` di panel Explorer → **Copy** → klik kanan area kosong → **Paste** → ganti nama hasil salinannya menjadi `.env.local`.

Isi file `.env.local` harus persis seperti ini:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

Lalu **nyalakan lagi** dev server:

```bash
npm run dev
```

**🔍 Penjelasan:**

- **Environment variable** adalah pengaturan yang disimpan di luar kode. Contohnya alamat API: di laptop kamu bisa `https://dummyjson.com`, di server kantor bisa alamat lain, dan kodenya tidak perlu diubah.
- **Kenapa ada prefix `NEXT_PUBLIC_`?** Secara bawaan, Next.js **menyembunyikan** environment variable dari browser demi keamanan. Kode kita nanti berjalan di browser (Client Component), jadi variabelnya harus diberi awalan `NEXT_PUBLIC_` supaya bisa dibaca di sana. Konsekuensinya, **jangan pernah** menaruh rahasia (password, secret key) di variabel `NEXT_PUBLIC_`, karena siapa pun bisa melihatnya di browser.
- **Kenapa `.env.local` tidak di-commit?** File `.env*` biasanya berisi pengaturan pribadi atau rahasia, jadi sudah diabaikan oleh `.gitignore`. Yang di-commit hanya `.env.example` sebagai contoh untuk anggota tim lain.
- ⚠️ **WAJIB restart dev server** setiap kali membuat atau mengubah `.env.local` (`Ctrl + C`, lalu `npm run dev`). Next.js membaca file ini saat server dinyalakan. Kalau tidak di-restart, nilai lamanya tetap dipakai.

**✅ Checkpoint:** Saat `npm run dev` dijalankan, terminal menampilkan baris `- Environments: .env.local`.

**⚠️ Error yang sering muncul:**

1. **Baris `Environments: .env.local` tidak muncul.** Nama filenya salah, misalnya `env.local` (tanpa titik di depan) atau `.env.local.txt` (Notepad di Windows suka menambahkan `.txt`). Rename lewat VS Code supaya namanya persis `.env.local`.
2. **Lupa restart dev server.** Nanti di Tahap 5 muncul error `status 404`. Matikan server dengan `Ctrl + C`, lalu `npm run dev` lagi.
3. **Isinya diberi spasi atau tanda kutip**, misalnya `NEXT_PUBLIC_API_URL = "https://dummyjson.com/"`. Tulis persis tanpa spasi di sekitar `=` dan **tanpa** garis miring `/` di akhir.

---

<a id="tahap-3"></a>

### Tahap 3 — Buat tipe data (⏱️ ± 3 menit)

**🎯 Tujuan:** Memberi tahu TypeScript bentuk data yang akan kita terima dari API, supaya VS Code bisa membantu (autocomplete) dan memberi peringatan kalau kita salah ketik.

**📄 Nama file:** `product.ts`

**📁 Lokasi:** `src/types/product.ts`. **BUAT FILE BARU**. Folder `types` belum ada, jadi **buat dulu folder `types` di dalam `src`**.

**🧩 Kode:**

```ts
// Tipe data untuk respons dari DummyJSON.
// Respons asli punya LEBIH BANYAK field (brand, stock, tags, images, dll).
// Kita sengaja hanya mendefinisikan field yang dipakai di aplikasi supaya tipenya pendek.
// Field lain tetap ada di data, hanya saja TypeScript tidak "tahu" dan kita tidak memakainya.

// Satu produk di halaman daftar
export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

// Satu ulasan dari pembeli
export type Review = {
  rating: number;
  comment: string;
  reviewerName: string;
};

// Produk lengkap untuk halaman detail
export type ProductDetail = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  reviews: Review[];
};

// Bentuk respons GET /products.
// Perhatikan: daftar produk DIBUNGKUS di dalam properti `products`, bukan langsung array.
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// Data yang kita kirim saat menambah produk (POST /products/add)
export type NewProduct = {
  title: string;
  price: number;
};
```

**🔍 Penjelasan:**

- `type` mendefinisikan "cetakan" bentuk data. `number` untuk angka, `string` untuk teks.
- `export` artinya tipe ini bisa dipakai (di-`import`) dari file lain.
- `Review[]` artinya **array** (daftar) berisi banyak `Review`.
- Respons asli DummyJSON punya banyak field lain (`brand`, `stock`, `tags`, dll). Kita **hanya menulis field yang dipakai** supaya tipenya pendek dan mudah dibaca.
- `ProductsResponse` meniru bentuk respons yang kamu lihat di Tahap 1: objek yang **membungkus** array `products`.
- `NewProduct` hanya berisi `title` dan `price`, yaitu data yang akan kita kirim lewat form di Tahap 7.

**✅ Checkpoint:** File `src/types/product.ts` sudah ada dan tidak ada garis merah di VS Code. Belum ada perubahan di browser, dan itu normal.

**⚠️ Error yang sering muncul:**

1. **File salah tempat**, misalnya di `src/app/types/product.ts`. Pastikan foldernya `src/types`, sejajar dengan folder `app`. Kalau salah tempat, nanti muncul error `Module not found: Can't resolve '@/types/product'`.
2. **Salah ketik nama field**, misalnya `titel`. Nanti TypeScript protes `Property 'title' does not exist`. Samakan dengan nama field di JSON Tahap 1.

---

<a id="tahap-4"></a>

### Tahap 4 — Buat fungsi pemanggil API (⏱️ ± 4 menit)

**🎯 Tujuan:** Mengumpulkan semua kode `fetch` di satu file, supaya halaman cukup memanggil fungsi seperti `getProducts()` tanpa perlu tahu detail URL-nya.

**📄 Nama file:** `api.ts`

**📁 Lokasi:** `src/lib/api.ts`. **BUAT FILE BARU**. Folder `lib` belum ada, jadi **buat dulu folder `lib` di dalam `src`**.

**🧩 Kode:**

```ts
import type {
  NewProduct,
  Product,
  ProductDetail,
  ProductsResponse,
} from "@/types/product";

// Alamat dasar API dibaca dari .env.local.
// Kalau suatu saat pindah ke backend lain, cukup ganti .env.local tanpa mengubah kode.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /products → ambil 10 produk (hanya field title, price, thumbnail)
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products?limit=10&select=title,price,thumbnail`,
  );

  // fetch TIDAK otomatis gagal walau server membalas 404 atau 500.
  // Karena itu kita cek sendiri: response.ok bernilai true hanya untuk status 200–299.
  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar produk (status ${response.status})`);
  }

  const data: ProductsResponse = await response.json();

  // Respons API berbentuk { products: [...], total, skip, limit }.
  // Halaman hanya butuh array produknya, jadi yang dikembalikan data.products, BUKAN data.
  return data.products;
}

// GET /products/:id → ambil satu produk lengkap dengan ulasannya
export async function getProductById(id: string): Promise<ProductDetail> {
  const response = await fetch(`${API_URL}/products/${id}`);

  // 404 = produknya tidak ada. Kita beri pesan yang mudah dipahami pengguna.
  if (response.status === 404) {
    throw new Error(`Produk dengan id ${id} tidak ditemukan.`);
  }

  if (!response.ok) {
    throw new Error(`Gagal mengambil detail produk (status ${response.status})`);
  }

  const data: ProductDetail = await response.json();
  return data;
}

// POST /products/add → kirim produk baru ke server.
// Server membalas dengan data yang kita kirim + id baru, makanya tipe return-nya
// NewProduct & { id: number } (gabungan isi NewProduct ditambah field id).
export async function addProduct(
  product: NewProduct,
): Promise<NewProduct & { id: number }> {
  const response = await fetch(`${API_URL}/products/add`, {
    method: "POST",
    // Memberi tahu server bahwa isi (body) yang kita kirim berformat JSON
    headers: { "Content-Type": "application/json" },
    // Body harus berupa teks, jadi objek JavaScript diubah dulu menjadi teks JSON
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Gagal menambah produk (status ${response.status})`);
  }

  const data: NewProduct & { id: number } = await response.json();
  return data;
}
```

**🔍 Penjelasan:**

- **`fetch(url)`** adalah fungsi bawaan browser untuk mengirim request HTTP. Tanpa opsi tambahan, method-nya `GET`.
- **`async` / `await`**: mengambil data dari internet butuh waktu. `await` artinya "tunggu sampai selesai, baru lanjut ke baris berikutnya". `await` hanya boleh dipakai di dalam fungsi yang diberi `async`.
- **`Promise<Product[]>`**: fungsi `async` selalu mengembalikan **Promise**, yaitu "janji" bahwa hasilnya akan datang nanti. Isi `<...>` adalah tipe hasilnya. Jadi `Promise<Product[]>` artinya "nanti hasilnya berupa array `Product`".
- **`response.ok`**: `true` kalau status code 200–299. Penting: `fetch` **tidak** otomatis error saat server membalas 404 atau 500, jadi kita wajib mengeceknya sendiri.
- **`throw new Error("...")`**: menghentikan fungsi dan "melempar" pesan error. Nanti pesan ini ditangkap oleh halaman dan ditampilkan ke pengguna.
- **`response.json()`**: mengubah isi respons (teks JSON) menjadi objek JavaScript. Ini juga butuh `await`.
- **`return data.products`** (bukan `data`): ingat Tahap 1, daftar produknya ada di dalam properti `products`. Halaman butuh array, jadi kita ambil array-nya di sini.
- **`` `${API_URL}/products` ``**: ini **template literal** (pakai backtick `` ` ``). Bagian `${...}` diisi nilai variabel. Hasilnya `https://dummyjson.com/products...`.
- **`addProduct`** memakai opsi tambahan:
  - `method: "POST"` → kirim data, bukan minta data.
  - `headers: { "Content-Type": "application/json" }` → memberi tahu server bahwa isinya JSON.
  - `body: JSON.stringify(product)` → mengubah objek menjadi teks JSON, karena body harus berupa teks.
- **`NewProduct & { id: number }`**: tanda `&` menggabungkan dua tipe. Artinya: semua field `NewProduct` (`title`, `price`) **ditambah** field `id`. Ini bentuk balasan server setelah POST.

**✅ Checkpoint:** Tidak ada garis merah di `src/lib/api.ts`. Browser belum berubah. Fungsi ini baru dipakai di Tahap 5.

**⚠️ Error yang sering muncul:**

1. **`Cannot find module '@/types/product'`**. File Tahap 3 belum dibuat atau salah lokasi. Cek lagi `src/types/product.ts`.
2. **`Property 'ok' does not exist on type 'Promise<Response>'`**. Kamu lupa menulis `await` sebelum `fetch(...)`.
3. **Salah tanda kutip di URL.** URL yang berisi `${...}` wajib memakai backtick `` ` `` (tombol di kiri angka 1), **bukan** kutip biasa `'` atau `"`.

---

<a id="tahap-5"></a>

### Tahap 5 — Tampilkan daftar produk (⏱️ ± 8 menit)

**🎯 Tujuan:** Mengambil 10 produk dari API saat halaman dibuka, lalu menampilkannya sebagai grid kartu. Alurnya terlihat jelas: **loading → sukses → error**.

**📄 Nama file:** `page.tsx`

**📁 Lokasi:** `src/app/page.tsx`. **UBAH FILE YANG SUDAH ADA (hapus semua isinya, lalu ganti dengan kode di bawah)**.

**🧩 Kode:**

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default function Home() {
  // Tiga state untuk tiga kondisi: datanya, sedang loading, dan pesan error
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fungsi di dalam useEffect tidak boleh async secara langsung,
    // jadi kita buat fungsi async di dalamnya lalu memanggilnya.
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        // finally selalu jalan, baik sukses maupun gagal
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []); // [] = jalankan sekali saja saat halaman pertama kali tampil

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
            <p className="mt-1 text-sm text-gray-500">Data dari DummyJSON</p>
          </div>
          <Link
            href="/products/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Tambah Produk
          </Link>
        </div>

        {isLoading && (
          <p className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Error: {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:border-blue-400"
              >
                <div className="flex justify-center rounded-lg bg-gray-100 p-2">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={150}
                    height={150}
                  />
                </div>
                <h2 className="mt-3 text-sm font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="mt-1 font-bold text-blue-600">${product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

**🔍 Penjelasan:**

- **`"use client"`** di baris pertama menjadikan file ini **Client Component**, yaitu komponen yang berjalan di browser. Ini wajib karena kita memakai `useState` dan `useEffect`, yang hanya bisa jalan di browser.
- **State** adalah "ingatan" komponen. Kalau nilainya berubah, tampilan ikut di-render ulang. Kita pakai 3 state:
  - `products` → daftar produk, awalnya array kosong `[]`.
  - `isLoading` → `true` selama data masih diambil.
  - `error` → pesan error, atau `null` kalau tidak ada error.
- **`useEffect(() => {...}, [])`** menjalankan kode **setelah** halaman tampil. Array kosong `[]` di akhir artinya "jalankan sekali saja".
- **`try / catch / finally`**:
  - `try` → coba ambil data. Kalau berhasil, simpan ke state `products`.
  - `catch` → kalau ada `throw new Error` dari `api.ts`, pesannya disimpan ke state `error`.
  - `finally` → selalu jalan di akhir, sukses atau gagal, untuk mematikan loading.
- **Tampilan bersyarat**: `{isLoading && <p>Loading...</p>}` artinya "tampilkan Loading kalau `isLoading` bernilai `true`".
- **Tampilan** hanya memakai class Tailwind dasar: `min-h-screen bg-gray-50` untuk latar abu-abu muda, `mx-auto max-w-5xl px-4 py-8` supaya isi berada di tengah, dan `rounded-xl border bg-white shadow-sm` untuk kartu. `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` membuat grid 2 kolom di HP, 3 kolom di tablet, dan 5 kolom di layar lebar. `hover:` hanya mengubah warna saat kursor di atas elemen.
- **`.map()`** mengubah setiap produk menjadi satu kartu. **`key={product.id}`** wajib ada supaya React bisa membedakan tiap kartu.
- **`<Link href=...>`** dari Next.js untuk pindah halaman tanpa reload penuh. Setiap kartu menuju `/products/1`, `/products/2`, dst.
- **`<Image>`** dari `next/image` wajib diberi `width` dan `height` supaya ruangnya sudah disiapkan sebelum gambar selesai dimuat, jadi layout tidak "loncat".
- **`${product.price}`** di dalam JSX: tanda `$` di sini hanya **teks biasa** (simbol dolar), lalu `{product.price}` adalah nilainya. Hasilnya `$9.99`.

> 🧪 **Eksperimen 1 menit:** buka `src/lib/api.ts`, lalu di fungsi `getProducts` tambahkan `&delay=2000` di akhir URL sehingga menjadi `/products?limit=10&select=title,price,thumbnail&delay=2000`. Simpan, lalu refresh browser. Sekarang tulisan **"Loading..."** terlihat selama 2 detik, karena DummyJSON sengaja menunda balasannya. **Setelah itu kembalikan URL seperti semula** (hapus `&delay=2000`).

**✅ Checkpoint:**

- Buka http://localhost:3000. Sekilas muncul "Loading...", lalu tampil **10 kartu produk** lengkap dengan gambar, nama, dan harga (misalnya `$9.99`).
- Ada tombol **"+ Tambah Produk"** di kanan atas.
- Klik salah satu kartu → URL berubah ke `/products/1` (halamannya baru dibuat di Tahap 6, jadi 404 dulu itu wajar).

**⚠️ Error yang sering muncul:**

1. **`products.map is not a function`**. Penyebab: di `getProducts` kamu menulis `return data` alih-alih `return data.products`. Akibatnya `products` berisi **objek** `{ products, total, skip, limit }`, padahal `.map()` hanya ada di array. Perbaiki di `src/lib/api.ts` menjadi `return data.products;`.
2. **`Error: Gagal mengambil daftar produk (status 404)`**. Biasanya `.env.local` belum dibuat atau dev server belum di-restart. Akibatnya alamatnya menjadi `http://localhost:3000/undefined/products...` (bisa dilihat di DevTools → tab Network). Ulangi [Tahap 2](#tahap-2), lalu restart dev server.
3. **``You're importing a module that depends on `useState` into a React Server Component module``** (atau `useEffect`). Kamu lupa menulis `"use client"` di baris **paling atas** file.

---

<a id="tahap-6"></a>

### Tahap 6 — Halaman detail + ulasan (⏱️ ± 5 menit)

**🎯 Tujuan:** Membuat halaman `/products/[id]` yang mengambil detail satu produk berdasarkan id di URL, lengkap dengan ulasan pembeli, dan menampilkan pesan ramah kalau produknya tidak ada.

**📄 Nama file:** `page.tsx`

**📁 Lokasi:** `src/app/products/[id]/page.tsx`. **BUAT FILE BARU**. Folder `products` dan `[id]` belum ada: **buat folder `products` di dalam `src/app`, lalu buat folder `[id]` di dalamnya** (lengkap dengan tanda kurung siku `[ ]`).

**🧩 Kode:**

```tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import type { ProductDetail } from "@/types/product";

// Komponen halaman (yang dipakai Next.js) hanya membungkus isi halaman dengan <Suspense>.
// Di Next.js 16, komponen yang membaca useParams wajib berada di dalam <Suspense>,
// karena nilai id baru diketahui saat halaman dibuka. Tanpa ini, npm run build gagal.
export default function ProductDetailPage() {
  return (
    <Suspense fallback={<p className="p-6 text-gray-500">Loading...</p>}>
      <ProductDetailContent />
    </Suspense>
  );
}

function ProductDetailContent() {
  // Ambil [id] dari URL. Contoh: /products/5 → id = "5" (selalu berupa string)
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]); // jalankan ulang kalau id di URL berubah

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Kembali ke daftar
        </Link>

        {isLoading && (
          <p className="mt-6 rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {product && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex justify-center rounded-lg bg-gray-100 p-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                />
              </div>

              <div>
                <p className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Kategori: {product.category}
                </p>
                <h1 className="mt-3 text-2xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                  ${product.price}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Rating: {product.rating} / 5
                </p>
                <p className="mt-4 text-gray-700">{product.description}</p>
              </div>
            </div>

            <h2 className="mt-8 border-t border-gray-200 pt-6 text-lg font-semibold text-gray-900">
              Ulasan ({product.reviews.length})
            </h2>
            <ul className="mt-4 space-y-3">
              {/* Ulasan tidak punya id, jadi index dipakai sebagai key.
                  Aman karena daftar ulasan ini tidak diubah urutannya. */}
              {product.reviews.map((review, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900">
                      {review.reviewerName}
                    </p>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
```

**🔍 Penjelasan:**

- **Folder `[id]`** dengan kurung siku disebut **dynamic route**. Satu file ini melayani `/products/1`, `/products/2`, `/products/99999`, dan seterusnya.
- **`useParams<{ id: string }>()`** membaca bagian dinamis dari URL. Untuk `/products/5`, hasilnya `id = "5"`. Nilainya selalu **string**, bukan number.
- **Kenapa ada `<Suspense>`?** Di Next.js 16, komponen yang membaca `useParams` di dynamic route wajib dibungkus `<Suspense>`. Alasannya, nilai `id` baru diketahui saat halaman dibuka, bukan saat `npm run build`. `<Suspense>` menampilkan `fallback` ("Loading...") sambil menunggu. Karena itu file ini punya 2 komponen:
  - `ProductDetailPage` → komponen halaman (yang dipakai Next.js), hanya membungkus dengan `<Suspense>`.
  - `ProductDetailContent` → isi halaman yang sebenarnya.
- **`useEffect(..., [id])`**: kali ini dependency-nya `[id]`, artinya data diambil ulang kalau `id` berubah.
- **`useState<ProductDetail | null>(null)`**: tanda `|` artinya "atau". Awalnya `null` (belum ada data), setelah fetch berhasil berisi `ProductDetail`.
- **Penanganan 404**: kalau id tidak ada, `getProductById` (Tahap 4) melempar error "Produk dengan id ... tidak ditemukan." dan pesan itu tampil di halaman.
- **Ulasan** ditampilkan dengan `.map()`. Ulasan tidak punya `id`, jadi kita memakai `index` (urutan) sebagai `key`.

**✅ Checkpoint:**

- Klik kartu pertama di halaman daftar. Tampil gambar, nama, kategori, harga, rating, deskripsi, dan **3 ulasan** produk "Essence Mascara Lash Princess".
- Buka http://localhost:3000/products/99999 → tampil pesan **"Produk dengan id 99999 tidak ditemukan."**. Di console browser akan ada baris `404 (Not Found)` berwarna merah. Itu wajar, karena browser memang mencatat respons 404 dari API.
- Link **"← Kembali ke daftar"** membawa kembali ke `/`.

**⚠️ Error yang sering muncul:**

1. **Halaman 404 bawaan Next.js ("This page could not be found")** saat membuka `/products/1`. Nama foldernya salah, misalnya `id` tanpa kurung siku, atau `product` tanpa huruf `s`. Pastikan path-nya persis `src/app/products/[id]/page.tsx`.
2. **``Next.js encountered URL data `useParams()` in a Client Component outside of `<Suspense>` ``** saat `npm run build`. Kamu memanggil `useParams` langsung di komponen yang di-`export default` tanpa pembungkus `<Suspense>`. Salin ulang kode di atas apa adanya.
3. **`Cannot read properties of null (reading 'title')`**. Kamu menghapus pengecekan `{product && (...)}`. Pengecekan ini perlu karena saat pertama render `product` masih `null`.

---

<a id="tahap-7"></a>

### Tahap 7 — Tambah produk dengan POST (⏱️ ± 5 menit)

**🎯 Tujuan:** Membuat form yang mengirim produk baru ke server memakai method `POST`, lalu menampilkan balasan server (termasuk id baru).

**📄 Nama file:** `page.tsx`

**📁 Lokasi:** `src/app/products/new/page.tsx`. **BUAT FILE BARU**. Folder `new` belum ada, jadi **buat folder `new` di dalam `src/app/products`** (sejajar dengan folder `[id]`).

**🧩 Kode:**

```tsx
"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { addProduct } from "@/lib/api";
import type { NewProduct } from "@/types/product";

export default function NewProductPage() {
  // Form "controlled": isi setiap input selalu disimpan di state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<(NewProduct & { id: number }) | null>(
    null,
  );

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Cegah perilaku bawaan form yang me-refresh halaman
    event.preventDefault();
    setError(null);
    setResult(null);

    // Nilai input selalu string, jadi harga diubah dulu ke number
    const priceNumber = Number(price);

    // Validasi sederhana sebelum mengirim ke server
    if (title.trim() === "") {
      setError("Nama produk tidak boleh kosong.");
      return;
    }
    if (price.trim() === "" || Number.isNaN(priceNumber) || priceNumber <= 0) {
      setError("Harga harus berupa angka lebih dari 0.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newProduct: NewProduct = { title: title.trim(), price: priceNumber };
      const data = await addProduct(newProduct);
      setResult(data);
      // Kosongkan form setelah berhasil
      setTitle("");
      setPrice("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Kembali ke daftar
        </Link>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Tambah Produk</h1>
          <p className="mt-1 text-sm text-gray-500">
            Isi nama dan harga, lalu klik Simpan.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Nama produk
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Kopi Susu"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Harga ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 4.99"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Mengirim..." : "Simpan"}
            </button>
          </form>

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-800">
                Berhasil! Server memberi id baru: {result.id}
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-3 text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                Catatan: DummyJSON hanya pura-pura menyimpan, jadi produk ini
                tidak akan muncul di halaman daftar. Itu normal.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
```

**🔍 Penjelasan:**

- **Form controlled**: nilai setiap input disimpan di state (`title`, `price`). Setiap kali kamu mengetik, `onChange` memperbarui state, dan `value={...}` menampilkan isi state itu.
- **`event.preventDefault()`**: secara bawaan, form HTML me-refresh halaman saat dikirim. Baris ini mencegahnya supaya kita bisa mengirim data sendiri lewat `fetch`.
- **`SubmitEvent<HTMLFormElement>`** adalah tipe untuk event "form dikirim" dari React.
- **Validasi sederhana** sebelum mengirim:
  - nama tidak boleh kosong (`trim()` membuang spasi di awal/akhir),
  - harga harus angka dan lebih dari 0.
- **`Number(price)`**: isi input **selalu string**, meskipun `type="number"`. Kita ubah ke number dulu supaya server menerima `4.99`, bukan `"4.99"`.
- **`isSubmitting`**: selama request berjalan, tombol di-`disabled` dan teksnya menjadi "Mengirim...". Ini mencegah pengguna mengklik dua kali sehingga data terkirim dobel.
- Detail `fetch` dengan `method: "POST"`, header `Content-Type`, dan `JSON.stringify` ada di `addProduct` (Tahap 4). Halaman ini cukup memanggil `addProduct(newProduct)`.
- **`JSON.stringify(result, null, 2)`** di dalam `<pre>` menampilkan balasan server apa adanya dalam format JSON yang rapi.
- ⚠️ **PENTING: DummyJSON hanya MENSIMULASIKAN penyimpanan.** Server membalas `201 Created` dengan id baru (misalnya `195`), tapi produknya **tidak benar-benar disimpan**. Jadi produk baru **tidak akan muncul** di halaman daftar. **Itu normal, bukan error.** Dengan backend sungguhan, produknya akan tersimpan di database.

**✅ Checkpoint:**

- Klik **"+ Tambah Produk"** di halaman daftar → form tampil di `/products/new`.
- Klik **Simpan** dengan form kosong → muncul "Nama produk tidak boleh kosong."
- Isi nama, harga `0` → muncul "Harga harus berupa angka lebih dari 0."
- Isi nama `Kopi Susu` dan harga `4.99`, lalu klik **Simpan** → tombol sempat berubah menjadi "Mengirim...", lalu tampil **"Berhasil! Server memberi id baru: 195"** beserta JSON `{ "id": 195, "title": "Kopi Susu", "price": 4.99 }`, dan form kosong lagi.

**⚠️ Error yang sering muncul:**

1. **"Produk yang saya tambahkan tidak muncul di daftar!"** Ini **bukan error**. DummyJSON hanya pura-pura menyimpan (lihat penjelasan di atas).
2. **Halaman ter-refresh dan tidak terjadi apa-apa saat klik Simpan.** Kamu lupa `event.preventDefault()`, atau lupa `onSubmit={handleSubmit}` di tag `<form>`.
3. **Di balasan server, `price` tertulis `"4.99"` (pakai kutip).** Kamu mengirim `price` langsung dari state (string). Pastikan yang dikirim adalah `priceNumber`.

---

🎉 **Selamat! Aplikasi Katalog Produk kamu sudah jadi.** Bagian di bawah ini opsional.

---

<a id="bonus-a"></a>

### BONUS A — Pencarian produk (⏱️ opsional, di luar 30 menit)

> 🌟 **BONUS.** Kerjakan hanya kalau Tahap 1–7 sudah selesai.

**🎯 Tujuan:** Menambah kotak pencarian di halaman daftar memakai endpoint `GET /products/search?q=...`.

#### File 1 — `api.ts`

**📄 Nama file:** `api.ts`

**📁 Lokasi:** `src/lib/api.ts`. **UBAH FILE YANG SUDAH ADA (hapus semua isinya, lalu ganti dengan kode di bawah)**.

**🧩 Kode:**

```ts
import type {
  NewProduct,
  Product,
  ProductDetail,
  ProductsResponse,
} from "@/types/product";

// Alamat dasar API dibaca dari .env.local.
// Kalau suatu saat pindah ke backend lain, cukup ganti .env.local tanpa mengubah kode.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /products → ambil 10 produk (hanya field title, price, thumbnail)
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products?limit=10&select=title,price,thumbnail`,
  );

  // fetch TIDAK otomatis gagal walau server membalas 404 atau 500.
  // Karena itu kita cek sendiri: response.ok bernilai true hanya untuk status 200–299.
  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar produk (status ${response.status})`);
  }

  const data: ProductsResponse = await response.json();

  // Respons API berbentuk { products: [...], total, skip, limit }.
  // Halaman hanya butuh array produknya, jadi yang dikembalikan data.products, BUKAN data.
  return data.products;
}

// GET /products/:id → ambil satu produk lengkap dengan ulasannya
export async function getProductById(id: string): Promise<ProductDetail> {
  const response = await fetch(`${API_URL}/products/${id}`);

  // 404 = produknya tidak ada. Kita beri pesan yang mudah dipahami pengguna.
  if (response.status === 404) {
    throw new Error(`Produk dengan id ${id} tidak ditemukan.`);
  }

  if (!response.ok) {
    throw new Error(`Gagal mengambil detail produk (status ${response.status})`);
  }

  const data: ProductDetail = await response.json();
  return data;
}

// POST /products/add → kirim produk baru ke server.
// Server membalas dengan data yang kita kirim + id baru, makanya tipe return-nya
// NewProduct & { id: number } (gabungan isi NewProduct ditambah field id).
export async function addProduct(
  product: NewProduct,
): Promise<NewProduct & { id: number }> {
  const response = await fetch(`${API_URL}/products/add`, {
    method: "POST",
    // Memberi tahu server bahwa isi (body) yang kita kirim berformat JSON
    headers: { "Content-Type": "application/json" },
    // Body harus berupa teks, jadi objek JavaScript diubah dulu menjadi teks JSON
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Gagal menambah produk (status ${response.status})`);
  }

  const data: NewProduct & { id: number } = await response.json();
  return data;
}

// BONUS A — GET /products/search?q=... → cari produk berdasarkan kata kunci
export async function searchProducts(query: string): Promise<Product[]> {
  // encodeURIComponent mengamankan karakter khusus (spasi, &, ?) supaya URL tidak rusak
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}&limit=10&select=title,price,thumbnail`,
  );

  if (!response.ok) {
    throw new Error(`Gagal mencari produk (status ${response.status})`);
  }

  // Bentuk responsnya sama dengan GET /products, jadi tipenya juga ProductsResponse
  const data: ProductsResponse = await response.json();
  return data.products;
}
```

**🔍 Penjelasan:**

- Isinya sama dengan Tahap 4, ditambah fungsi `searchProducts` di bagian bawah.
- **`encodeURIComponent(query)`** mengubah karakter khusus menjadi aman untuk URL. Contoh: spasi menjadi `%20`, sehingga `red lipstick` tidak merusak URL.
- Bentuk respons endpoint search **sama** dengan `GET /products` (dibungkus `products`), jadi kita juga mengembalikan `data.products`.

#### File 2 — `page.tsx`

**📄 Nama file:** `page.tsx`

**📁 Lokasi:** `src/app/page.tsx`. **UBAH FILE YANG SUDAH ADA (hapus semua isinya, lalu ganti dengan kode di bawah)**.

**🧩 Kode:**

```tsx
"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, searchProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default function Home() {
  // Tiga state untuk tiga kondisi: datanya, sedang loading, dan pesan error
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BONUS A: kata kunci pencarian
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fungsi di dalam useEffect tidak boleh async secara langsung,
    // jadi kita buat fungsi async di dalamnya lalu memanggilnya.
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        // finally selalu jalan, baik sukses maupun gagal
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []); // [] = jalankan sekali saja saat halaman pertama kali tampil

  // BONUS A: dipanggil saat form pencarian dikirim
  async function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Kotak pencarian kosong → tampilkan lagi 10 produk awal
      const data =
        query.trim() === ""
          ? await getProducts()
          : await searchProducts(query.trim());
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
            <p className="mt-1 text-sm text-gray-500">Data dari DummyJSON</p>
          </div>
          <Link
            href="/products/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Tambah Produk
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, contoh: phone"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            Cari
          </button>
        </form>

        {isLoading && (
          <p className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Error: {error}
          </p>
        )}

        {!isLoading && !error && products.length === 0 && (
          <p className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Produk tidak ditemukan.
          </p>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:border-blue-400"
              >
                <div className="flex justify-center rounded-lg bg-gray-100 p-2">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={150}
                    height={150}
                  />
                </div>
                <h2 className="mt-3 text-sm font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="mt-1 font-bold text-blue-600">${product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

**🔍 Penjelasan:**

- State baru `query` menyimpan isi kotak pencarian (form controlled, sama seperti Tahap 7).
- `handleSearch` dipanggil saat form dikirim (klik **Cari** atau tekan Enter). Kalau kotaknya kosong, kita ambil lagi 10 produk awal lewat `getProducts()`.
- Kalau hasilnya array kosong, tampil "Produk tidak ditemukan."

**✅ Checkpoint:**

- Ketik `phone` lalu tekan Enter → tampil produk seperti "Apple AirPods Max Silver", "iPhone 5s", dll.
- Ketik `zzzzqq` → tampil "Produk tidak ditemukan."
- Kosongkan kotak lalu klik **Cari** → 10 produk awal muncul lagi.

**⚠️ Error yang sering muncul:**

1. **`searchProducts is not exported from '@/lib/api'`**. File 1 belum disimpan atau belum diganti. Salin ulang File 1.
2. **Halaman ter-refresh saat menekan Enter.** `event.preventDefault()` terhapus dari `handleSearch`.

---

<a id="bonus-b"></a>

### BONUS B — Hapus produk (⏱️ opsional, di luar 30 menit)

> 🌟 **BONUS.** Kerjakan hanya kalau Tahap 1–7 sudah selesai.

**🎯 Tujuan:** Menambah tombol **Hapus Produk** di halaman detail memakai `DELETE /products/:id`, lalu menampilkan nilai `isDeleted` dari respons server.

#### File 1 — `api.ts`

**📄 Nama file:** `api.ts`

**📁 Lokasi:** `src/lib/api.ts`. **UBAH FILE YANG SUDAH ADA (hapus semua isinya, lalu ganti dengan kode di bawah)**.

**🧩 Kode:**

> Kode ini sudah termasuk `searchProducts` dari Bonus A. Tidak masalah meskipun kamu melewati Bonus A.

```ts
import type {
  NewProduct,
  Product,
  ProductDetail,
  ProductsResponse,
} from "@/types/product";

// Alamat dasar API dibaca dari .env.local.
// Kalau suatu saat pindah ke backend lain, cukup ganti .env.local tanpa mengubah kode.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /products → ambil 10 produk (hanya field title, price, thumbnail)
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products?limit=10&select=title,price,thumbnail`,
  );

  // fetch TIDAK otomatis gagal walau server membalas 404 atau 500.
  // Karena itu kita cek sendiri: response.ok bernilai true hanya untuk status 200–299.
  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar produk (status ${response.status})`);
  }

  const data: ProductsResponse = await response.json();

  // Respons API berbentuk { products: [...], total, skip, limit }.
  // Halaman hanya butuh array produknya, jadi yang dikembalikan data.products, BUKAN data.
  return data.products;
}

// GET /products/:id → ambil satu produk lengkap dengan ulasannya
export async function getProductById(id: string): Promise<ProductDetail> {
  const response = await fetch(`${API_URL}/products/${id}`);

  // 404 = produknya tidak ada. Kita beri pesan yang mudah dipahami pengguna.
  if (response.status === 404) {
    throw new Error(`Produk dengan id ${id} tidak ditemukan.`);
  }

  if (!response.ok) {
    throw new Error(`Gagal mengambil detail produk (status ${response.status})`);
  }

  const data: ProductDetail = await response.json();
  return data;
}

// POST /products/add → kirim produk baru ke server.
// Server membalas dengan data yang kita kirim + id baru, makanya tipe return-nya
// NewProduct & { id: number } (gabungan isi NewProduct ditambah field id).
export async function addProduct(
  product: NewProduct,
): Promise<NewProduct & { id: number }> {
  const response = await fetch(`${API_URL}/products/add`, {
    method: "POST",
    // Memberi tahu server bahwa isi (body) yang kita kirim berformat JSON
    headers: { "Content-Type": "application/json" },
    // Body harus berupa teks, jadi objek JavaScript diubah dulu menjadi teks JSON
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Gagal menambah produk (status ${response.status})`);
  }

  const data: NewProduct & { id: number } = await response.json();
  return data;
}

// BONUS A — GET /products/search?q=... → cari produk berdasarkan kata kunci
export async function searchProducts(query: string): Promise<Product[]> {
  // encodeURIComponent mengamankan karakter khusus (spasi, &, ?) supaya URL tidak rusak
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}&limit=10&select=title,price,thumbnail`,
  );

  if (!response.ok) {
    throw new Error(`Gagal mencari produk (status ${response.status})`);
  }

  // Bentuk responsnya sama dengan GET /products, jadi tipenya juga ProductsResponse
  const data: ProductsResponse = await response.json();
  return data.products;
}

// BONUS B — DELETE /products/:id → hapus produk (hanya simulasi di DummyJSON)
// Respons asli berisi seluruh data produk + isDeleted + deletedOn.
// Kita hanya menuliskan field yang dipakai.
export async function deleteProduct(
  id: string,
): Promise<{ id: number; title: string; isDeleted: boolean }> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Gagal menghapus produk (status ${response.status})`);
  }

  const data: { id: number; title: string; isDeleted: boolean } =
    await response.json();
  return data;
}
```

**🔍 Penjelasan:**

- `deleteProduct` memakai `method: "DELETE"`. Request DELETE tidak butuh `body` maupun header `Content-Type`, karena kita tidak mengirim data apa pun selain id di URL.
- Respons aslinya berisi seluruh data produk ditambah `isDeleted: true` dan `deletedOn`. Kita hanya menuliskan field yang dipakai.

#### File 2 — `page.tsx`

**📄 Nama file:** `page.tsx`

**📁 Lokasi:** `src/app/products/[id]/page.tsx`. **UBAH FILE YANG SUDAH ADA (hapus semua isinya, lalu ganti dengan kode di bawah)**.

**🧩 Kode:**

```tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { deleteProduct, getProductById } from "@/lib/api";
import type { ProductDetail } from "@/types/product";

// Komponen halaman (yang dipakai Next.js) hanya membungkus isi halaman dengan <Suspense>.
// Di Next.js 16, komponen yang membaca useParams wajib berada di dalam <Suspense>,
// karena nilai id baru diketahui saat halaman dibuka. Tanpa ini, npm run build gagal.
export default function ProductDetailPage() {
  return (
    <Suspense fallback={<p className="p-6 text-gray-500">Loading...</p>}>
      <ProductDetailContent />
    </Suspense>
  );
}

function ProductDetailContent() {
  // Ambil [id] dari URL. Contoh: /products/5 → id = "5" (selalu berupa string)
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BONUS B: state untuk proses hapus
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]); // jalankan ulang kalau id di URL berubah

  // BONUS B: dipanggil saat tombol Hapus diklik
  async function handleDelete() {
    setIsDeleting(true);
    setDeleteMessage(null);

    try {
      const data = await deleteProduct(id);
      setDeleteMessage(
        `isDeleted: ${data.isDeleted} — "${data.title}" dihapus (simulasi, data asli tidak berubah).`,
      );
    } catch (err) {
      setDeleteMessage(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Kembali ke daftar
        </Link>

        {isLoading && (
          <p className="mt-6 rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {product && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex justify-center rounded-lg bg-gray-100 p-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                />
              </div>

              <div>
                <p className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Kategori: {product.category}
                </p>
                <h1 className="mt-3 text-2xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                  ${product.price}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Rating: {product.rating} / 5
                </p>
                <p className="mt-4 text-gray-700">{product.description}</p>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Menghapus..." : "Hapus Produk"}
                </button>

                {deleteMessage && (
                  <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                    {deleteMessage}
                  </p>
                )}
              </div>
            </div>

            <h2 className="mt-8 border-t border-gray-200 pt-6 text-lg font-semibold text-gray-900">
              Ulasan ({product.reviews.length})
            </h2>
            <ul className="mt-4 space-y-3">
              {/* Ulasan tidak punya id, jadi index dipakai sebagai key.
                  Aman karena daftar ulasan ini tidak diubah urutannya. */}
              {product.reviews.map((review, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900">
                      {review.reviewerName}
                    </p>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
```

**🔍 Penjelasan:**

- Dua state baru: `isDeleting` (untuk men-disable tombol) dan `deleteMessage` (pesan hasil hapus).
- `handleDelete` memanggil `deleteProduct(id)`, lalu menampilkan `isDeleted` dari respons server.
- Sama seperti POST, DummyJSON hanya **mensimulasikan** penghapusan. Produknya tetap ada kalau halaman di-refresh.

**✅ Checkpoint:** Buka `/products/1`, klik **Hapus Produk** → tombol sempat berubah menjadi "Menghapus...", lalu tampil `isDeleted: true — "Essence Mascara Lash Princess" dihapus (simulasi, data asli tidak berubah).`

**⚠️ Error yang sering muncul:**

1. **`deleteProduct is not exported from '@/lib/api'`**. File 1 belum diganti. Salin ulang File 1.
2. **Produk masih ada setelah refresh.** Itu normal, karena DummyJSON tidak benar-benar menghapus data.

---

<a id="troubleshooting"></a>

## 🛠️ Troubleshooting umum

| Masalah | Penyebab | Solusi |
| --- | --- | --- |
| `Port 3000 is in use` | Ada dev server lain (atau aplikasi lain) yang masih jalan di port 3000. | Matikan terminal lain yang menjalankan `npm run dev`. Next.js biasanya otomatis pindah ke port 3001; buka alamat yang tertulis di terminal. Bisa juga jalankan `npm run dev -- -p 3001`. |
| `Error: Gagal mengambil daftar produk (status 404)` dan di tab Network terlihat URL `.../undefined/products...` | Environment variable tidak terbaca: `.env.local` belum dibuat, namanya salah, atau dev server belum di-restart. | Ulangi [Tahap 2](#tahap-2). Pastikan terminal menampilkan `- Environments: .env.local`, lalu **restart** dev server (`Ctrl + C` → `npm run dev`). |
| `'next' is not recognized` / `Cannot find module 'next'` | Lupa `npm install`. | Jalankan `npm install` di folder project, lalu `npm run dev`. |
| ``You're importing a module that depends on `useState` into a React Server Component module`` (atau `useEffect`) | Lupa `"use client"`. | Tambahkan `"use client";` di baris **pertama** file halaman. |
| `products.map is not a function` | `getProducts` mengembalikan `data` (objek), bukan `data.products` (array). | Di `src/lib/api.ts`, ubah menjadi `return data.products;`. |
| Garis merah TypeScript, misalnya `Property 'xxx' does not exist on type ...` | Nama field salah ketik, atau tipe di `src/types/product.ts` tidak cocok dengan kode. | Bandingkan dengan kode di README. Cek juga ejaannya (huruf besar/kecil berpengaruh). Kalau garis merah tetap ada padahal kode sudah benar, di VS Code tekan `Ctrl + Shift + P` → **TypeScript: Restart TS Server**. |
| `Error: Failed to fetch` / `TypeError: fetch failed` | Koneksi internet putus, atau `dummyjson.com` diblokir jaringan (misalnya proxy/firewall kantor). | Cek internet. Buka https://dummyjson.com/products/1 di browser. Kalau tidak bisa dibuka, coba ganti jaringan (misalnya hotspot HP). |
| `Invalid src prop ... hostname "..." is not configured under images` | `next.config.ts` terubah, atau gambar berasal dari domain lain. | Kembalikan `next.config.ts` seperti semula: `git checkout next.config.ts`, lalu restart dev server. |
| Peringatan kuning `...was detected as the Largest Contentful Paint (LCP)` di console | Saran optimasi dari Next.js untuk gambar besar di atas layar. | Ini **peringatan, bukan error**. Boleh diabaikan untuk workshop ini. |

---

<a id="rangkuman"></a>

## 🧠 Rangkuman konsep yang dipelajari

1. **REST API & HTTP**: endpoint, query parameter, method `GET` / `POST` / `DELETE`, status code `200` / `201` / `404`.
2. **JSON**: format pertukaran data. Respons bisa dibungkus objek, jadi selalu cek bentuknya dulu (`data.products`).
3. **Environment variable**: alamat API disimpan di `.env.local`, prefix `NEXT_PUBLIC_` agar terbaca di browser, dan wajib restart setelah diubah.
4. **TypeScript types**: mendefinisikan hanya field yang dipakai.
5. **Native `fetch`**: `async/await`, `response.ok`, `response.json()`, `throw new Error`.
6. **Pemisahan tanggung jawab**: semua pemanggilan API dikumpulkan di `src/lib/api.ts`, semua tipe di `src/types/product.ts`.
7. **Client Component**: `"use client"`, `useState`, `useEffect`, dan alur **loading → sukses → error**.
8. **Dynamic route**: folder `[id]`, `useParams`, dan `<Suspense>`.
9. **Form controlled + POST**: validasi, konversi string → number, `JSON.stringify`, dan state `isSubmitting`.

> 💡 **Catatan:** di workshop ini kita fetch di **Client Component** supaya alur loading/error terlihat jelas. Next.js juga bisa melakukan fetch langsung di **Server Component** (komponen `async` tanpa `"use client"`), sehingga data sudah siap sebelum halaman dikirim ke browser. Itu materi untuk sesi berikutnya dan tidak dipraktikkan di sini.

### 🔗 Referensi

- MDN — Using the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN — HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- Dokumentasi Next.js: https://nextjs.org/docs
- Next.js — Environment Variables: https://nextjs.org/docs/app/guides/environment-variables
- Next.js — Image Component: https://nextjs.org/docs/app/api-reference/components/image
- Next.js — useParams: https://nextjs.org/docs/app/api-reference/functions/use-params
- Dokumentasi DummyJSON (Products): https://dummyjson.com/docs/products
