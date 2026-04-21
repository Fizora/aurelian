"use client";

import { useState, useEffect, useCallback } from "react";

// Type definition for slide data
interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

// Data object untuk slide - bisa diisi dengan produk terbaru atau event kolaborasi
const slidesData: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Summer Collection 2025",
    description:
      "Discover the latest trends in sustainable fashion. Limited edition pieces crafted for the modern explorer.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    badge: "New Arrivals",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Rocco x Studio Kura",
    description:
      "Exclusive collaboration celebrating artisanal craftsmanship. Limited quantities available.",
    ctaText: "Explore Collaboration",
    ctaLink: "/collaboration",
    badge: "Limited Edition",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Tech Meets Style",
    description:
      "Innovative fabrics with smart features. Pre-order now for early access to our most advanced collection.",
    ctaText: "Learn More",
    ctaLink: "/tech-collection",
    badge: "Pre-Order Now",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Fungsi untuk langsung menuju slide tertentu
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slider Container - Horizontal sliding */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full shrink-0  min-h-screen"
          >
            {/* Gambar Background dengan object-cover untuk konsistensi */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gelap untuk readability teks */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Konten Teks dengan container mx-auto */}
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-2xl">
                  {/* Badge */}
                  {slide.badge && (
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 font-mono tracking-tight">
                    {slide.title}
                  </h1>
                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-lg">
                    {slide.description}
                  </p>
                  {/* CTA Button */}
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                  >
                    {slide.ctaText}
                    <svg
                      className="w-5 h-5 ml-2"
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Tombol Navigasi Next */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indikator Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${
              currentIndex === index
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Indikator Slide Number */}
      <div className="absolute bottom-8 right-8 z-20 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {slidesData.length}
      </div>
    </div>
  );
}
