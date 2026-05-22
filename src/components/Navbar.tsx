// components/Navbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoBagOutline } from "react-icons/io5";
import { LuMenu, LuX, LuSearch, LuArrowRight } from "react-icons/lu";

interface SearchProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  badge?: string;
}

const DUMMY_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3EAURELIAN%3C/text%3E%3C/svg%3E";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circleExpanded, setCircleExpanded] = useState(false);
  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchCircleExpanded, setSearchCircleExpanded] = useState(false);
  const [searchCirclePos, setSearchCirclePos] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Location", href: "/location" },
  ];

  const popularTerms = [
    "oversized tee",
    "cargo pants",
    "denim jacket",
    "sneakers",
    "hoodie",
    "bucket hat",
  ];
  const genderOptions = ["Men", "Women", "Unisex"];
  const priceRange = "Rp500.000 - Rp1.500.000";
  const colorOptions = ["Black", "White", "Gray", "Beige", "Olive"];

  const trendingProducts: SearchProduct[] = [
    {
      id: 1,
      name: "Oversized Drop Shoulder Tee",
      brand: "AURELIAN",
      price: "Rp499.000",
      image: DUMMY_IMAGE,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Technical Cargo Pants",
      brand: "AURELIAN",
      price: "Rp899.000",
      image: DUMMY_IMAGE,
      badge: "New",
    },
    {
      id: 3,
      name: "Cropped Knit Sweater",
      brand: "AURELIAN",
      price: "Rp699.000",
      image: DUMMY_IMAGE,
      badge: "Limited",
    },
  ];

  const handleMenuToggle = () => {
    if (isSearchOpen) handleSearchClose();
    if (!isMenuOpen) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setCirclePos({
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2,
        });
      }
      setIsMenuOpen(true);
      setTimeout(() => setCircleExpanded(true), 10);
    } else {
      setCircleExpanded(false);
      setTimeout(() => setIsMenuOpen(false), 500);
    }
  };

  const handleSearchOpen = () => {
    if (isMenuOpen) handleMenuToggle();
    const rect = searchInputRef.current?.getBoundingClientRect();
    if (rect) {
      setSearchCirclePos({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
    }
    setIsSearchOpen(true);
    setTimeout(() => setSearchCircleExpanded(true), 10);
  };

  const handleSearchClose = () => {
    setSearchCircleExpanded(false);
    setTimeout(() => setIsSearchOpen(false), 500);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) handleSearchClose();
        if (isMenuOpen) handleMenuToggle();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (searchCircleExpanded && searchOverlayInputRef.current) {
      searchOverlayInputRef.current.focus();
    }
  }, [searchCircleExpanded]);

  return (
    <>
      <header className="w-full fixed left-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="mx-auto container flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          {/* Logo - black, high contrast */}
          <Link
            href="/"
            className="font-mono text-2xl md:text-3xl font-black tracking-tighter text-black hover:opacity-80 transition"
          >
            AURELIAN.
          </Link>

          {/* Desktop Navigation - dark gray, not too light */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-900 font-medium hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search input (desktop) */}
            <div className="relative hidden sm:block">
              <LuSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchOpen}
                className="pl-9 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:border-black focus:bg-white w-44 lg:w-56 text-sm text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Search icon (mobile) */}
            <button
              onClick={handleSearchOpen}
              className="sm:hidden text-gray-900 hover:text-black transition"
              aria-label="Search"
            >
              <LuSearch size={22} />
            </button>

            {/* Cart icon with badge */}
            <Link
              href="/cart"
              className="text-gray-900 hover:text-black transition relative"
            >
              <IoBagOutline size={24} />
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Sign In button - high contrast */}
            <Link
              href="/signin"
              className="hidden sm:block bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition text-sm font-medium shadow-sm"
            >
              Sign In
            </Link>

            {/* Mobile menu button */}
            <button
              ref={buttonRef}
              onClick={handleMenuToggle}
              className="block md:hidden text-gray-900 hover:text-black transition p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay (unchanged – already uses high contrast) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            <div
              className="absolute bg-white rounded-full transition-transform duration-700 ease-out shadow-2xl"
              style={{
                top: circlePos.top,
                left: circlePos.left,
                width: "40px",
                height: "40px",
                transform: `translate(-50%, -50%) scale(${circleExpanded ? 120 : 0})`,
                transformOrigin: "center center",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: circleExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative z-50 w-full bg-white text-black flex flex-col justify-center min-h-screen overflow-auto"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
                <motion.nav
                  className="flex flex-col gap-6 items-start"
                  initial="hidden"
                  animate={circleExpanded ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                    },
                  }}
                >
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: "easeOut" },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleMenuToggle}
                        className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 hover:text-gray-500 transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    circleExpanded
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 text-gray-600"
                >
                  <Link
                    href="/signin"
                    onClick={handleMenuToggle}
                    className="hover:text-black transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/cart"
                    onClick={handleMenuToggle}
                    className="hover:text-black transition"
                  >
                    Shopping Cart
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={handleMenuToggle}
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

      {/* Search Overlay (unchanged – already uses readable text) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute bg-white rounded-full transition-transform duration-700 ease-out shadow-2xl"
              style={{
                top: searchCirclePos.top,
                left: searchCirclePos.left,
                width: "40px",
                height: "40px",
                transform: `translate(-50%, -50%) scale(${searchCircleExpanded ? 120 : 0})`,
                transformOrigin: "center center",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: searchCircleExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="relative z-50 w-full h-full bg-white overflow-auto"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-8 pt-4">
                  <h2 className="text-xl font-semibold font-mono tracking-tight text-gray-900">
                    Search
                  </h2>
                  <button
                    onClick={handleSearchClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Close search"
                  >
                    <LuX size={24} className="text-gray-700" />
                  </button>
                </div>

                <div className="relative mb-8">
                  <LuSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    ref={searchOverlayInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, collections..."
                    className="w-full pl-12 pr-4 py-4 text-lg border-b-2 border-gray-200 focus:border-black outline-none transition-colors text-gray-900 placeholder-gray-500"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
                  {/* Filters sidebar */}
                  <div className="lg:col-span-4 space-y-8">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        Popular Search Terms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTerms.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-800 transition"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        Gender
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {genderOptions.map((gender) => (
                          <button
                            key={gender}
                            className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-black hover:text-black transition"
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        Shop By Price
                      </h3>
                      <button className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-black transition">
                        {priceRange}
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        Color
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-black"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                            aria-label={`Color ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trending products */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-serif font-bold text-gray-900">
                        Trending Now
                      </h2>
                      <span className="text-sm text-gray-600">Just In</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group cursor-pointer"
                          onClick={handleSearchClose}
                        >
                          <div className="bg-gray-100 rounded-xl overflow-hidden mb-3 relative aspect-square">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                              sizes="(max-width: 768px) 100vw, 240px"
                            />
                          </div>
                          <h3 className="font-medium text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.brand}
                          </p>
                          <p className="font-semibold text-gray-900 mt-1">
                            {product.price}
                          </p>
                          {product.badge && (
                            <span className="inline-block mt-1 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-8">
                      <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-300 hover:border-black transition">
                        View all products <LuArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
