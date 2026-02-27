import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/app/lib/dal";
import ProductForm from "@/app/components/admin/ProductForm";
import type { Product } from "@/app/types/product";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function EditProductPage({ params }: PageProps) {
  await requireRole(["admin"]);

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (Number.isNaN(id)) return notFound();

  let product: Product;
  try {
    product = await getProduct(id);
  } catch {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Edit Product</h1>

        <Link
          href="/admin/products"
          className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <ProductForm mode="edit" initial={product} productId={id} />
      </div>
    </main>
  );
}
