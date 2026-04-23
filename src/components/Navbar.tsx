"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoBag } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuMenu, LuX, LuSearch } from "react-icons/lu";

const Navbar = () => {
  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circleExpanded, setCircleExpanded] = useState(false);
  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // State for search overlay
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchCircleExpanded, setSearchCircleExpanded] = useState(false);
  const [searchCirclePos, setSearchCirclePos] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Popular search terms (from image)
  const popularTerms = [
    "airmax",
    "structureplus",
    "p-6000",
    "nike tn",
    "jordan",
    "airforce1",
    "airjordan1low",
    "vomero5",
  ];

  // Filter options
  const genderOptions = ["Men", "Women", "Kids", "Boys", "Girls"];
  const priceRange = "Rp1.500.001 - Rp2.999.999";
  const colorOptions = ["Purple", "Black", "White", "Red", "Blue"];

  // Just In products (based on image)
  const justInProducts = [
    {
      id: 1,
      name: "Nike Pegasus 42",
      color: "Purple",
      category: "Men's Road Running Shoes",
      price: "Rp2.199.000",
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      name: "Nike Pegasus 42",
      color: "Black",
      category: "Women's Road Running Shoes",
      price: "Rp2.199.000",
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "Nike Pegasus 42",
      color: "White",
      category: "Women's Road Running Shoes (Wide)",
      price: "Rp2.199.000",
      image: "/api/placeholder/200/200",
    },
  ];

  // Mobile menu handlers
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

  // Search overlay handlers
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

  // Lock scroll when any overlay is open
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

  // ESC to close
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

  // Focus on overlay input when circle expands
  useEffect(() => {
    if (searchCircleExpanded && searchOverlayInputRef.current) {
      searchOverlayInputRef.current.focus();
    }
  }, [searchCircleExpanded]);

  return (
    <>
      <header className="w-full fixed left-0 top-0 z-50 bg-white text-black shadow-sm">
        <div className="mx-auto container flex items-center justify-between p-4">
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

          {/* Search, Icon & Auth */}
          <div className="flex items-center gap-5 text-gray-600">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchOpen}
                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-black w-32 sm:w-40"
              />
            </div>
            <Link href="/cart" className="hover:text-black transition">
              <IoBag size={24} />
            </Link>
            <Link
              href="/signin"
              className="hidden sm:block bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-900 transition text-sm"
            >
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={handleMenuToggle}
              className="block md:hidden text-gray-700 hover:text-black transition p-1 z-50 relative"
              aria-label="Menu"
            >
              {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: circleExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative z-50 w-full bg-white text-black flex flex-col justify-center min-h-screen overflow-auto"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
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
                        onClick={handleMenuToggle}
                        className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 hover:text-gray-500 transition-colors py-2"
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
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 text-gray-500"
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

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50">
            {/* Expanding white circle from search input */}
            <div
              className="absolute bg-white rounded-full transition-transform duration-700 ease-out"
              style={{
                top: searchCirclePos.top,
                left: searchCirclePos.left,
                width: "40px",
                height: "40px",
                transform: `translate(-50%, -50%) scale(${searchCircleExpanded ? 120 : 0})`,
                transformOrigin: "center center",
              }}
            />

            {/* Search Overlay Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: searchCircleExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative z-50 w-full h-full bg-white overflow-auto"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Header with Input and Close Button */}
                <div className="flex items-center gap-4 mb-8 pt-4">
                  <div className="flex-1 relative">
                    <LuSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      ref={searchOverlayInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products, brands and more..."
                      className="w-full pl-10 pr-4 py-3 text-lg border-b-2 border-gray-200 focus:border-black outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handleSearchClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    aria-label="Close search"
                  >
                    <LuX size={24} />
                  </button>
                </div>

                {/* Search Results / Suggestions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                  {/* Left Column - Popular Searches & Filters */}
                  <div className="lg:col-span-4 space-y-8">
                    {/* Popular Search Terms */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Popular Search Terms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTerms.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gender Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Gender
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {genderOptions.map((gender) => (
                          <button
                            key={gender}
                            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-black transition"
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shop By Price */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Shop By Price
                      </h3>
                      <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-black transition">
                        {priceRange}
                      </button>
                    </div>

                    {/* Colour */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Colour
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Just In Products */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Just In</h2>
                      <span className="text-sm text-gray-500">
                        Brand: Sports
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {justInProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group cursor-pointer"
                          onClick={() => {
                            // Handle product selection
                            handleSearchClose();
                          }}
                        >
                          <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-auto object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.color}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.category}
                          </p>
                          <p className="font-semibold text-gray-900 mt-2">
                            {product.price}
                          </p>
                        </div>
                      ))}
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
