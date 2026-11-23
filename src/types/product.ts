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