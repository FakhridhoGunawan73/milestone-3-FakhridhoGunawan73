import axiosInstance from "../../lib/axios";
import { Product } from "../../types/product";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // id ini didapat dari nama folder [id]
  const { id } = await params;

  try {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    const product = response.data;

    return (
      <main className="min-h-screen bg-gray-50 p-2 md:p-8">
        <div className="max-w-8xl mx-auto px-10">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-3 mb-8"
          >
            ← Back to Catalog
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gambar */}
            <div className="w-full aspect-square md:aspect-auto md:h-125 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/*Detail */}
            <div className="p-8 px-4 md:h-125 flex flex-col justify-center rounded-2xl shadow-xl">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">
                {product.category.name}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-3xl font-light text-gray-900 mb-6">
                ${product.price}
              </p>
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <button className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan!</h1>
        <Link href="/" className="mt-4 text-blue-600">
          Back to Home
        </Link>
      </div>
    );
  }
}
