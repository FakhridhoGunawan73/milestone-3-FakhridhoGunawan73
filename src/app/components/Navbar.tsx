"use client";

import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState<number>(0);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 tracking-tighter"
        >
          REVOSHOP
        </Link>
        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>

          <button
            onClick={() => setCartCount(cartCount + 1)}
            className="relative p-2 hover:text-blue-600 transition-colors"
          >
            Cart : {cartCount}
            {cartCount > 0 && (
              <span className="px-1 absolute text-blue-600"></span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
