"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl px-6 mx-auto h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter shrink-0 z-50"
        >
          Revo<span className="text-blue-600">Shop</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-blue-600" : ""} hover:text-blue-600 transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/faq"
            className={`${pathname === "/faq" ? "text-blue-600" : ""} hover:text-blue-600 transition-colors`}
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative hover:text-blue-600"
            title="Cart"
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-3 rounded-full bg-blue-600 px-1.5 text-xs text-white">
              {totalItems}
            </span>
          </Link>
          <button className="hidden md:flex text-white bg-blue-600 border rounded-md px-4 py-1">
            Login
          </button>

          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`
        fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-bold ${pathname === "/" ? "text-blue-600" : "text-gray-800"}`}
        >
          Home
        </Link>
        <Link
          href="/faq"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-bold ${pathname === "/faq" ? "text-blue-600" : "text-gray-800"}`}
        >
          FAQ
        </Link>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
