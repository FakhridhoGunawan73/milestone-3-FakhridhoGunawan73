import { ProductHeaderProps } from "../types/product";

function ProductHeader({ count }: ProductHeaderProps) {
  return (
    <main className="max-w-8xl mx-auto mt-6 px-10">
      <div className="text-2xl font-bold">Products</div>
      <p>Showing {count} items</p>
    </main>
  );
}

export default ProductHeader;
