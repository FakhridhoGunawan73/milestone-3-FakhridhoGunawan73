import axiosInstance from "./lib/axios";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";

export default async function Home() {
  const response = await axiosInstance.get<Product[]>("/products");
  const products = response.data;

  return (
    <ProductGrid>
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </ProductGrid>
  );
}
