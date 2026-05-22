"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Showcase products data
const showcaseProducts = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    brand: "AURELIAN",
    price: "Rp1.299.000",
    originalPrice: "Rp1.899.000",
    image: "/images/showcase/oversized-blazer.jpg",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 234,
    description:
      "Single-breasted, relaxed fit with notch lapels. 100% merino wool.",
  },
  {
    id: 2,
    name: "Pleated Wide Leg Pants",
    brand: "AURELIAN",
    price: "Rp899.000",
    originalPrice: "Rp1.299.000",
    image: "/images/showcase/pleated-wide.jpg",
    badge: "Limited",
    rating: 4.7,
    reviews: 189,
    description: "High-waisted, fluid drape. Button fly and side adjusters.",
  },
  {
    id: 3,
    name: "Cropped Knit Vest",
    brand: "AURELIAN",
    price: "Rp599.000",
    originalPrice: "Rp799.000",
    image: "/images/showcase/cropped-knit.jpg",
    badge: "New",
    rating: 4.9,
    reviews: 56,
    description: "Wool blend, V-neck, ribbed hem. Layer over shirts or tees.",
  },
  {
    id: 4,
    name: "Leather Loafer Shoes",
    brand: "AURELIAN",
    price: "Rp1.499.000",
    originalPrice: "Rp2.199.000",
    image: "/images/showcase/leather-loafer-shoes.jpg",
    badge: "Trending",
    rating: 4.6,
    reviews: 412,
    description: "Full‑grain leather, leather sole, cushioned insole.",
  },
  {
    id: 5,
    name: "Technical Cargo Jacket",
    brand: "AURELIAN",
    price: "Rp2.199.000",
    originalPrice: "Rp3.199.000",
    image: "/images/showcase/technical-cargo-jacket.jpg",
    badge: "Editors' Pick",
    rating: 4.9,
    reviews: 98,
    description: "Water‑resistant, multiple pockets, adjustable hood.",
  },
  {
    id: 6,
    name: "Silk Blend Scarf",
    brand: "AURELIAN",
    price: "Rp349.000",
    originalPrice: "Rp499.000",
    image: "/images/showcase/silk-blend-scarf.jpg",
    badge: "Accessory",
    rating: 4.5,
    reviews: 73,
    description: "70% silk, 30% wool. Digital print, fringed edges.",
  },
];

// Star rating component
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

const Showcase = () => {
  return (
    <section className="bg-white pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header – no animation */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-mono uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 tracking-tight">
            The{" "}
            <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              essential
            </span>{" "}
            edit
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
            A hand‑picked assortment of our most wanted pieces — each one built
            to last, designed to be loved.
          </p>
        </div>

        {/* Product Grid – static, no fade animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {showcaseProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 "
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full">
                {product.badge}
              </div>
              {/* Discount badge */}
              {product.originalPrice && (
                <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -
                  {Math.round(
                    (1 -
                      parseInt(product.price.replace(/\D/g, "")) /
                        parseInt(product.originalPrice.replace(/\D/g, ""))) *
                      100,
                  )}
                  %
                </div>
              )}

              {/* Image with quick shop overlay */}
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-5 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-gray-100">
                    Quick Shop
                  </button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-5">
                <p className="text-xs font-mono tracking-wider text-gray-400 mb-1">
                  {product.brand}
                </p>
                <h3 className="text-lg font-semibold font-serif tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-mono">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-black">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA – static */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium shadow-md"
          >
            View full collection
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
