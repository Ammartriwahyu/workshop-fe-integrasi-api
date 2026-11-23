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