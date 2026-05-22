"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
} from "react-icons/hi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const DUMMY_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'%3EAURELIAN%3C/text%3E%3C/svg%3E";

// Feature data – brief and to the point
const features = [
  {
    icon: HiOutlineTruck,
    title: "Free Express Shipping",
    tagline: "2–3 days, carbon‑neutral",
    description:
      "Free delivery on orders over Rp1.000.000. Real‑time tracking included.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Authenticity Guarantee",
    tagline: "100% genuine, blockchain‑verified",
    description:
      "Every item comes with a scannable QR code. Zero counterfeits since launch.",
  },
  {
    icon: HiOutlineRefresh,
    title: "30‑Day Easy Returns",
    tagline: "No restocking fee",
    description:
      "Full refund within 30 days. Free pickup for Aurelian Club members.",
  },
  {
    icon: HiOutlineHeart,
    title: "Aurelian Club",
    tagline: "Join 15,000+ insiders",
    description:
      "48h early access to drops, birthday gifts, and 10% off your first order.",
  },
];

const trendingProducts = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    brand: "AURELIAN",
    price: "Rp1.299.000",
    originalPrice: "Rp1.899.000",
    image: DUMMY_IMAGE,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: "Pleated Wide Leg Pants",
    brand: "AURELIAN",
    price: "Rp899.000",
    originalPrice: "Rp1.299.000",
    image: DUMMY_IMAGE,
    badge: "Limited",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 3,
    name: "Cropped Knit Vest",
    brand: "AURELIAN",
    price: "Rp599.000",
    originalPrice: "Rp799.000",
    image: DUMMY_IMAGE,
    badge: "New",
    rating: 4.9,
    reviews: 56,
  },
  {
    id: 4,
    name: "Leather Loafer Shoes",
    brand: "AURELIAN",
    price: "Rp1.499.000",
    originalPrice: "Rp2.199.000",
    image: DUMMY_IMAGE,
    badge: "Trending",
    rating: 4.6,
    reviews: 412,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Aisha P.",
    role: "Verified Buyer",
    text: "The quality is unmatched! My oversized blazer arrived in 2 days and fits perfectly. Will definitely order again.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Budi S.",
    role: "Member since 2024",
    text: "Authenticity guaranteed — I scanned the QR code and it's legit. The wide pants are so comfortable.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Clara M.",
    role: "Fashion Enthusiast",
    text: "Love the member exclusive drops! Got early access to the knit vest. Shipping was super fast.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

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

const Features = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Global Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-mono uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Why Aurelian
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 tracking-tight">
            Experience the{" "}
            <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              new standard
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
            Premium streetwear built on radical transparency, ethical
            craftsmanship, and a seamless shopping experience.
          </p>
        </div>

        {/* Dedicated Features Grid Title & Description */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Designed for the modern explorer
          </h3>
          <p className="text-gray-500 font-mono text-sm mt-2">
            Every detail, from shipping to sustainability, is crafted to elevate
            your experience.
          </p>
        </div>

        {/* Card Grid – improved spacing and consistent height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden text-center flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition duration-500" />
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-1">
                {feature.title}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                {feature.tagline}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed grow">
                {feature.description}
              </p>
              <Link
                href="#"
                className="inline-block mt-6 text-sm font-semibold text-black border-b border-black/30 hover:border-black transition self-center"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Badges – with better spacing and subtle separator */}
        <div className="relative text-center mb-32">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <div className="pt-16">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-6">
              Trusted by fashion lovers
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {["VOGUE", "HYPEBEAST", "HIGHSNOBIETY", "COMPLEX"].map(
                (brand) => (
                  <span
                    key={brand}
                    className="text-gray-500 font-mono text-lg md:text-xl font-bold tracking-wider hover:text-black transition cursor-default"
                  >
                    {brand}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Trending Products Section – improved grid and image consistency */}
        <div className="mb-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-mono uppercase tracking-wider text-gray-400">
                Trending now
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mt-1">
                Most wanted this week
              </h3>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 font-medium"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-3/4">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full">
                    {product.badge}
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -
                      {Math.round(
                        (1 -
                          parseInt(product.price.replace(/\D/g, "")) /
                            parseInt(
                              product.originalPrice.replace(/\D/g, ""),
                            )) *
                          100,
                      )}
                      %
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
                  <p className="text-sm text-gray-500 font-mono">
                    {product.brand}
                  </p>
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold text-black">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section – improved card spacing */}
        <div className="mb-32">
          <div className="text-center mb-14">
            <span className="text-sm font-mono uppercase tracking-wider text-gray-400">
              Real stories
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2">
              What our customers say
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 text-sm mt-3 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Commitment – with better visual hierarchy */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-32 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shrink-0">
              <HiOutlineGlobeAlt size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl">Circular by design</h4>
              <p className="text-gray-500 text-sm max-w-md">
                70% of our fabrics are recycled or deadstock. We offer free
                repairs and a take‑back program.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shrink-0">
              <HiOutlineChartBar size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl">Climate‑conscious shipping</h4>
              <p className="text-gray-500 text-sm max-w-md">
                All orders are shipped carbon‑neutral. We plant a tree for every
                10 orders — over 2,800 planted so far.
              </p>
            </div>
          </div>
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm font-medium shrink-0"
          >
            See our impact →
          </Link>
        </div>

        {/* Newsletter CTA – enhanced input group styling */}
        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-8 md:p-12 text-center">
          <HiOutlineSparkles size={40} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            Join 15,000+ style insiders
          </h3>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            Be the first to know about exclusive drops, members-only pricing,
            and get <span className="font-bold">10% off your first order</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-full text-black w-full focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            />
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
              Claim 10% off →
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
