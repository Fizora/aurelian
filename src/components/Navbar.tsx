"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoBag } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuMenu, LuX } from "react-icons/lu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circleExpanded, setCircleExpanded] = useState(false);
  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Buka/tutup menu dengan efek lingkaran
  const handleToggle = () => {
    if (!isMenuOpen) {
      // Dapatkan posisi tombol saat dibuka
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setCirclePos({
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2,
        });
      }
      setIsMenuOpen(true);
      // Trigger ekspansi lingkaran setelah render
      setTimeout(() => setCircleExpanded(true), 10);
    } else {
      setCircleExpanded(false);
      // Tunggu animasi lingkaran mengecil sebelum menghapus menu
      setTimeout(() => setIsMenuOpen(false), 500);
    }
  };

  // Lock scroll saat menu terbuka
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Tutup menu dengan tombol ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) handleToggle();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full fixed left-0 top-0 z-50 bg-white text-black shadow-sm p-4">
        <div className="mx-auto containe flex items-center justify-between">
          {/* Logo */}
          <div className="font-mono text-2xl font-black">
            <Link href="/">Aurelian.</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-black transition">
              Shop
            </Link>
            <Link href="/collections" className="hover:text-black transition">
              Collections
            </Link>
            <Link href="/about" className="hover:text-black transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-black transition">
              Contact
            </Link>
          </div>

          {/* Ikon & Auth */}
          <div className="flex items-center gap-5 text-gray-600">
            <Link href="/cart" className="hover:text-black transition">
              <IoBag size={24} />
            </Link>
            <Link
              href="/signin"
              className="hidden sm:block bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-900 transition text-sm"
            >
              Sign In
            </Link>

            {/* Tombol Menu Mobile (Hamburger) */}
            <button
              ref={buttonRef}
              onClick={handleToggle}
              className="block md:hidden text-gray-700 hover:text-black transition p-1 z-50 relative"
              aria-label="Menu"
            >
              {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Lingkaran putih yang membesar (efek tetesan air ala Musa Kopi) */}
            <div
              className="absolute bg-white rounded-full transition-transform duration-700 ease-out"
              style={{
                top: circlePos.top,
                left: circlePos.left,
                width: "40px",
                height: "40px",
                transform: `translate(-50%, -50%) scale(${circleExpanded ? 120 : 0})`,
                transformOrigin: "center center",
              }}
            />

            {/* Konten Menu (muncul setelah lingkaran membesar) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: circleExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative z-50 w-full bg-white text-black flex flex-col justify-center min-h-screen overflow-auto"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
                {/* Menu Items - Rata Kiri, Ukuran Besar, Fade Up */}
                <motion.nav
                  className="flex flex-col gap-4 md:gap-6 items-start"
                  initial="hidden"
                  animate={circleExpanded ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                    },
                  }}
                >
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: "easeOut" },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleToggle}
                        className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 hover:text-gray-500 transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Footer Menu (opsional) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    circleExpanded
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 text-gray-500"
                >
                  <Link
                    href="/signin"
                    onClick={handleToggle}
                    className="hover:text-black transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/cart"
                    onClick={handleToggle}
                    className="hover:text-black transition"
                  >
                    Shopping Cart
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={handleToggle}
                    className="hover:text-black transition"
                  >
                    Wishlist
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
