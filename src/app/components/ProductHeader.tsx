import { ProductHeaderProps } from "../types/product";

function ProductHeader({ count }: ProductHeaderProps) {
  return (
    <main className="max-w-5xl mx-auto py-8 bg-slate-50">
      <div className="text-2xl font-bold">Products</div>
      <p>Showing {count} items</p>
    </main>
  );
}

export default ProductHeader;
