import axios from "axios";
import { Product } from "../../types/product";
import Link from "next/link";
import AddToCart from "@/app/components/AddToCart";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await axios.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`,
    );
    const product = response.data;

    return (
      <main className="min-h-screen bg-white md:bg-gray-50/50 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2 mb-8 transition-colors"
          >
            <span className="text-xl">←</span> Back to Catalog
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white md:p-8 md:rounded-3xl md:shadow-sm">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
                {product.category.name}
              </span>

              <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold text-gray-900 mb-2">
                ${product.price}
              </p>

              <div className="border-gray-100 pt-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-2 w-full flex items-center justify-between ">
                <AddToCart product={product} withQty />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-gray-900">
          Produk tidak ditemukan!
        </h1>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }
}
