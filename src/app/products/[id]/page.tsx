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