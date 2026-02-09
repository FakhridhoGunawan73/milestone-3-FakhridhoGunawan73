"use client";

import axios from "axios";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import ProductHeader from "./components/ProductHeader";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Classic Black T-Shirt",
    price: 35,
    description: "High quality cotton t-shirt in black color.",
    // Menggunakan placeholder yang pasti muncul
    images: [
      "https://placehold.co/600x600/000000/FFFFFF/png?text=Black+TShirt",
    ],
    category: {
      id: 1,
      name: "Clothes",
      image: "https://placehold.co/600x400",
    },
  },
  {
    id: 2,
    title: "Classic Red Cap",
    price: 25,
    description: "Adjustable stylish red baseball cap.",
    images: ["https://placehold.co/600x600/e11d48/FFFFFF/png?text=Red+Cap"],
    category: {
      id: 2,
      name: "Accessories",
      image: "https://placehold.co/600x400",
    },
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(
          "https://api.escuelajs.co/api/v1/products",
          {
            params: { offset: 0, limit: 12 },
            timeout: 10000,
          },
        );
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(DUMMY_PRODUCTS);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        // PENTING: Jika API error, tetap tampilkan dummy
        setProducts(DUMMY_PRODUCTS);
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
