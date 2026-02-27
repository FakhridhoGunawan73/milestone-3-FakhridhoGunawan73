"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { cn } from "@/app/lib/utils";

type Profile = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
};

export default function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [pathname, refreshProfile]);

  const getAvatarUrl = (user: Profile) => {
    if (
      user?.avatar &&
      user.avatar.startsWith("http") &&
      !user.avatar.includes("placeimg.com")
    ) {
      return user.avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`;
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl px-6 mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter shrink-0 z-50"
        >
          Revo<span className="text-blue-600">Shop</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link
            href="/"
            className={cn(
              "hover:text-blue-600 transition-colors",
              pathname === "/" && "text-blue-600",
            )}
          >
            Home
          </Link>
          <Link
            href="/faq"
            className={cn(
              "hover:text-blue-600 transition-colors",
              pathname === "/faq" && "text-blue-600",
            )}
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-blue-600 transition-all"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* AUTH LOGIC */}
          {loading ? (
            <div className="w-10 h-10 bg-gray-100 animate-pulse rounded-full" />
          ) : profile ? (
            <Link href="/dashboard" className="relative group block">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-sm group-hover:ring-4 group-hover:ring-blue-50 transition-all relative">
                <Image
                  src={getAvatarUrl(profile)}
                  alt={profile.name ?? "User"}
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden p-2 text-gray-600 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible",
        )}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold"
        >
          Home
        </Link>
        <Link
          href="/faq"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold"
        >
          FAQ
        </Link>

        {!loading && profile ? (
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-600">
              <Image
                src={getAvatarUrl(profile)}
                alt="User"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-bold text-xl">{profile.name}</span>
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
