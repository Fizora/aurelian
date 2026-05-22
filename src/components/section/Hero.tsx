"use client";

import { useState, useEffect, useCallback } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

const slidesData: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Fall/Winter Capsule",
    description:
      "Discover the new collection — refined minimalism for the urban nomad. Limited pieces available.",
    ctaText: "Shop Now",
    ctaLink: "/collections/fall-winter",
    badge: "New Arrival",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    title: "VELORA x STUDIO KURA",
    description:
      "An exclusive collaboration celebrating artisanal craftsmanship. Each piece is numbered.",
    ctaText: "Explore Collab",
    ctaLink: "/collaboration",
    badge: "Limited Edition",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Tech-Forward Streetwear",
    description:
      "Innovative fabrics with smart features. Pre-order now for early access.",
    ctaText: "Pre-Order",
    ctaLink: "/tech-collection",
    badge: "Pre-Order Now",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div key={slide.id} className="relative w-full shrink-0 min-h-screen">
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-2xl">
                  {slide.badge && (
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 font-mono tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-lg">
                    {slide.description}
                  </p>
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

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
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
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
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

      <div className="absolute bottom-8 right-8 z-20 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {slidesData.length}
      </div>
    </div>
  );
}
