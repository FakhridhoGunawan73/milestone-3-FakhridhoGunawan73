"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [cartCount, setCartCount] = useState<number>(0);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-8xl px-10 mx-auto h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter shrink-0"
        >
          Revo<span className="text-blue-600">Shop</span>
        </Link>
        <div className="flex items-center gap-10">
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
          <div className="flex items-center">
            {pathname === "/faq" ? (
              <Link
                href="/"
                className="bg-blue-600 text-white rounded-xl px-6 py-2 text-md font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              >
                Back
              </Link>
            ) : (
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-lg text-gray-800 font-semibold"
              >
                Cart
                <span className="text-md rounded-full">({cartCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
