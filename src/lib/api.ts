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