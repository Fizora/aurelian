"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
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
import { TbWorldWww } from "react-icons/tb";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Dummy image base64 (gray placeholder)
const DUMMY_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'%3EVELORA%3C/text%3E%3C/svg%3E";

// Benefits data yang lebih meyakinkan
const benefits = [
  {
    icon: HiOutlineTruck,
    title: "Free Express Shipping",
    description:
      "Free 2-3 day delivery on orders over Rp1.000.000. Track your package in real-time.",
    stat: "⚡ 50% faster than standard",
    cta: "See shipping info",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Authenticity Guarantee",
    description:
      "100% genuine products sourced directly from brands. Each item comes with a certificate.",
    stat: "🔒 Verified by 3rd party",
    cta: "Our promise",
  },
  {
    icon: HiOutlineRefresh,
    title: "30-Day Easy Returns",
    description:
      "Change your mind? Return within 30 days for a full refund. No restocking fee.",
    stat: "📦 Free return pickup",
    cta: "Return policy",
  },
  {
    icon: HiOutlineHeart,
    title: "Member Exclusive Drops",
    description:
      "Join VELORA Club for early access to limited collections, birthday gifts, and special pricing.",
    stat: "🎁 10% off first purchase",
    cta: "Join for free",
  },
];

// Trending products lebih banyak dan detail
const trendingProducts = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    brand: "VELORA",
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
    brand: "VELORA",
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
    brand: "VELORA",
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
    brand: "VELORA",
    price: "Rp1.499.000",
    originalPrice: "Rp2.199.000",
    image: DUMMY_IMAGE,
    badge: "Trending",
    rating: 4.6,
    reviews: 412,
  },
];

// Testimonial data
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

const Features = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }, // now type-safe
  },
};

  return (
    <section className="bg-white py-24 md:py-32 font-sans" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-mono uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Why VELORA
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mt-6 tracking-tight">
            Experience the{" "}
            <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              new standard
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-4">
            We combine premium streetwear, blazing-fast service, and a seamless
            shopping experience — built for the modern explorer.
          </p>
        </motion.div>

        {/* Benefits Grid dengan statistik */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition duration-500" />
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <benefit.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
              {benefit.stat && (
                <p className="text-xs font-semibold text-gray-600 mt-2 bg-gray-100 inline-block px-2 py-0.5 rounded-full">
                  {benefit.stat}
                </p>
              )}
              <Link
                href="#"
                className="inline-block mt-4 text-sm font-semibold text-black border-b border-black/30 hover:border-black transition"
              >
                {benefit.cta} →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges / As Seen On */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">
            Trusted by fashion lovers
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            {["VOGUE", "HYPEBEAST", "HIGHSNOBIETY", "COMPLEX"].map((brand) => (
              <span
                key={brand}
                className="text-gray-500 font-mono text-lg md:text-xl font-bold tracking-wider"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Trending Products Section (diperkaya dengan rating dan diskon) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-28"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-sm font-mono uppercase tracking-wider text-gray-400">
                Trending now
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-mono mt-1">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={controls}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                    width={400}
                    height={500}
                    className="w-full object-cover transition group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-28"
        >
          <div className="text-center mb-10">
            <span className="text-sm font-mono uppercase tracking-wider text-gray-400">
              Real stories
            </span>
            <h3 className="text-3xl md:text-4xl font-bold font-mono mt-1">
              What our customers say
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sustainability Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gray-50 rounded-3xl p-8 md:p-10 mb-20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
              <HiOutlineGlobeAlt size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl">Sustainable fashion</h4>
              <p className="text-gray-500 text-sm max-w-md">
                We're committed to reducing our carbon footprint. 50% of our
                collection uses recycled materials.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
              <HiOutlineChartBar size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl">Carbon neutral shipping</h4>
              <p className="text-gray-500 text-sm max-w-md">
                All orders are shipped carbon-neutral. We plant a tree for every
                10 orders.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter CTA - lebih persuasif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-8 md:p-12 text-center"
        >
          <HiOutlineSparkles size={40} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-2xl md:text-3xl font-bold font-mono mb-2">
            Join 15,000+ style insiders
          </h3>
          <p className="text-gray-300 max-w-lg mx-auto mb-6">
            Be the first to know about exclusive drops, members-only pricing,
            and get <span className="font-bold">10% off your first order</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-full text-black w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md">
              Claim 10% off →
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
