"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuFilter, LuX, LuArrowUpDown } from "react-icons/lu";

const DUMMY_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'%3EAURELIAN%3C/text%3E%3C/svg%3E";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  category: string;
  color: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    brand: "AURELIAN",
    price: 1299000,
    originalPrice: 1899000,
    image: "/images/showcase/oversized-blazer.jpg",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 234,
    category: "Blazers",
    color: "Black",
  },
  {
    id: 2,
    name: "Pleated Wide Leg Pants",
    brand: "AURELIAN",
    price: 899000,
    originalPrice: 1299000,
    image: "/images/showcase/pleated-wide.jpg",
    badge: "Limited",
    rating: 4.7,
    reviews: 189,
    category: "Bottoms",
    color: "Gray",
  },
  {
    id: 3,
    name: "Cropped Knit Vest",
    brand: "AURELIAN",
    price: 599000,
    originalPrice: 799000,
    image: "/images/showcase/cropped-knit.jpg",
    badge: "New",
    rating: 4.9,
    reviews: 56,
    category: "Tops",
    color: "Beige",
  },
  {
    id: 4,
    name: "Leather Loafer Shoes",
    brand: "AURELIAN",
    price: 1499000,
    originalPrice: 2199000,
    image: "/images/showcase/leather-loafershoes.jpg",
    badge: "Trending",
    rating: 4.6,
    reviews: 412,
    category: "Footwear",
    color: "Black",
  },
  {
    id: 5,
    name: "Technical Cargo Jacket",
    brand: "AURELIAN",
    price: 2199000,
    originalPrice: 3199000,
    image: "/images/showcase/technical-cargo-jacket.jpg",
    badge: "Editors' Pick",
    rating: 4.9,
    reviews: 98,
    category: "Outerwear",
    color: "Olive",
  },
  {
    id: 6,
    name: "Silk Blend Scarf",
    brand: "AURELIAN",
    price: 349000,
    originalPrice: 499000,
    image: "/images/showcase/silk-blend-scarf.jpg",
    badge: "Accessory",
    rating: 4.5,
    reviews: 73,
    category: "Accessories",
    color: "Beige",
  },
  {
    id: 7,
    name: "Relaxed Denim Jacket",
    brand: "AURELIAN",
    price: 1599000,
    originalPrice: 1999000,
    image: DUMMY_IMAGE,
    badge: "Classic",
    rating: 4.7,
    reviews: 124,
    category: "Outerwear",
    color: "Blue",
  },
  {
    id: 8,
    name: "Merino Wool Sweater",
    brand: "AURELIAN",
    price: 849000,
    originalPrice: 1199000,
    image: DUMMY_IMAGE,
    badge: "Essential",
    rating: 4.8,
    reviews: 201,
    category: "Tops",
    color: "Gray",
  },
  {
    id: 9,
    name: "Leather Crossbody Bag",
    brand: "AURELIAN",
    price: 1249000,
    originalPrice: 1799000,
    image: DUMMY_IMAGE,
    badge: "Best Seller",
    rating: 4.9,
    reviews: 87,
    category: "Accessories",
    color: "Black",
  },
  {
    id: 10,
    name: "Linen Tailored Shorts",
    brand: "AURELIAN",
    price: 649000,
    originalPrice: 899000,
    image: DUMMY_IMAGE,
    badge: "Summer",
    rating: 4.6,
    reviews: 45,
    category: "Bottoms",
    color: "Beige",
  },
  {
    id: 11,
    name: "Oversized Hoodie",
    brand: "AURELIAN",
    price: 999000,
    originalPrice: 1399000,
    image: DUMMY_IMAGE,
    badge: "Comfort",
    rating: 4.8,
    reviews: 312,
    category: "Tops",
    color: "Gray",
  },
  {
    id: 12,
    name: "Chelsea Boots",
    brand: "AURELIAN",
    price: 1899000,
    originalPrice: 2499000,
    image: DUMMY_IMAGE,
    badge: "Limited",
    rating: 4.7,
    reviews: 156,
    category: "Footwear",
    color: "Black",
  },
];

const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
const colors = ["All", ...new Set(allProducts.map((p) => p.color))];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-xs" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <FaRegStar key={i} className="text-gray-300 text-xs" />
      ))}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-3/4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full text-gray-900 shadow-sm">
            {product.badge}
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{discount}%
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105 duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-black px-5 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            Quick Shop
          </button>
        </div>
      </div>
      <div className="mt-4 text-left">
        <p className="text-sm font-mono text-gray-700">{product.brand}</p>
        <h3 className="font-semibold text-lg font-serif text-gray-900">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-bold text-black">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              Rp{product.originalPrice.toLocaleString("id-ID")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500000]);

  let filtered = allProducts.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory)
      return false;
    if (selectedColor !== "All" && p.color !== selectedColor) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const maxPrice = Math.max(...allProducts.map((p) => p.price));

  const FilterDrawer = () => (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ${
        isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        transform: isFilterDrawerOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-serif font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => setIsFilterDrawerOpen(false)}
          className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition"
          aria-label="Close filters"
        >
          <LuX size={24} />
        </button>
      </div>
      <div className="p-4 space-y-6 overflow-auto h-full pb-24">
        <FilterSection
          title="Category"
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <FilterSection
          title="Color"
          options={colors}
          value={selectedColor}
          onChange={setSelectedColor}
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Price Range
          </h3>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm text-gray-800 mt-2">
            <span>Rp0</span>
            <span>Rp{priceRange[1].toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white">
        <button
          onClick={() => setIsFilterDrawerOpen(false)}
          className="w-full bg-black text-white py-3 rounded-full font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      <main className="bg-white pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl text-black font-serif font-bold">
              Shop All
            </h1>
            <p className="text-gray-700 mt-2">
              Discover our latest arrivals and timeless essentials
            </p>
          </div>

          <div className="flex justify-between items-center mb-6 lg:hidden">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800"
            >
              <LuFilter size={16} /> Filters
            </button>
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-8">
                <FilterSection
                  title="Category"
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
                <FilterSection
                  title="Color"
                  options={colors}
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-4">
                    Price Range
                  </h3>
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-black"
                  />
                  <div className="flex justify-between text-sm text-gray-800 mt-2">
                    <span>Rp0</span>
                    <span>Rp{priceRange[1].toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-sm text-gray-800">
                  {filtered.length} products
                </p>
                <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-700">
                    No products match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedColor("All");
                      setPriceRange([0, maxPrice]);
                    }}
                    className="mt-4 text-black underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FilterDrawer />
    </>
  );
}

const FilterSection = ({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <div>
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-4">
      {title}
    </h3>
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="radio"
            name={title}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-black"
          />
          <span
            className={
              value === opt ? "font-medium text-gray-900" : "text-gray-800"
            }
          >
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const SortSelect = ({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (val: "default" | "price-asc" | "price-desc" | "rating") => void;
}) => (
  <div className="relative">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as any)}
      className="appearance-none bg-gray-50 border border-gray-200 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:border-black text-gray-800"
    >
      <option value="default">Sort by: Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Best Rating</option>
    </select>
    <LuArrowUpDown
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
      size={14}
    />
  </div>
);
