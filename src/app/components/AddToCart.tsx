"use client";

import { useState } from "react";
import type { Product } from "@/app/types/product";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: Product;
  withQty?: boolean;
};

export default function AddToCart({ product, withQty = false }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  // HOME PAGE
  if (!withQty) {
    return (
      <button
        type="button"
        onClick={() => addItem(product, 1)}
        className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Add to Cart
      </button>
    );
  }

  // PRODUCT DETAIL
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center overflow-hidden rounded-xl border bg-blue-600 text-white">
        <button
          type="button"
          className="px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          -
        </button>

        <input
          type="number"
          min={1}
          value={qty}
          className="w-14 py-3 text-center text-sm font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            const next = parseInt(e.target.value, 10);
            if (Number.isNaN(next)) return;
            setQty(Math.max(1, next));
          }}
        />

        <button
          type="button"
          className="px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => setQty((q) => q + 1)}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(product, qty)}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
