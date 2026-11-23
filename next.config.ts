import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Komponen <Image> dari next/image hanya mau memuat gambar dari luar
  // (domain lain) kalau domain itu sudah didaftarkan di sini. Ini fitur keamanan:
  // tanpa daftar ini, siapa pun bisa memakai server kita untuk mengoptimasi
  // gambar dari situs mana saja. Semua gambar produk DummyJSON ada di
  // https://cdn.dummyjson.com, jadi hanya domain itu yang kita izinkan.
  // Peserta workshop TIDAK perlu mengubah file ini.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
