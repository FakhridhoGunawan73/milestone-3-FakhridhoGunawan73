"use client";

import axiosInstance from "./lib/axios";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import ProductHeader from "./components/ProductHeader";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<Product[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <main>
      <ProductHeader count={products.length} />

      <ProductGrid>
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ProductGrid>
    </main>
  );
}
