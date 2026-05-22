"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineMap,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineExternalLink,
} from "react-icons/hi";

// Store branch data
const branches = [
  {
    id: 1,
    name: "Aurelian Plaza Indonesia",
    address:
      "Plaza Indonesia, Lantai 3, No. 301, Jl. M.H. Thamrin No.28-30, Jakarta Pusat 10350",
    city: "Jakarta",
    hours: "Mon - Sun: 10:00 – 22:00",
    phone: "+62 21 2992 1234",
    mapUrl: "https://maps.google.com/?q=Plaza+Indonesia+Jakarta",
    image: "/images/img-1.jpg",
  },
  {
    id: 2,
    name: "Aurelian Pacific Place",
    address:
      "Pacific Place Mall, Lantai 2, Jl. Jend. Sudirman Kav. 52-53, SCBD, Jakarta Selatan 12190",
    city: "Jakarta",
    hours: "Mon - Sun: 10:00 – 21:30",
    phone: "+62 21 5140 2345",
    mapUrl: "https://maps.google.com/?q=Pacific+Place+Jakarta",
    image: "/images/img-1.jpg",
  },
  {
    id: 3,
    name: "Aurelian Tunjungan Plaza",
    address:
      "Tunjungan Plaza 3, Lantai UG, Jl. Embong Malang No.7-21, Surabaya 60261",
    city: "Surabaya",
    hours: "Mon - Sun: 10:00 – 21:00",
    phone: "+62 31 531 6789",
    mapUrl: "https://maps.google.com/?q=Tunjungan+Plaza+Surabaya",
    image: "/images/img-1.jpg",
  },
  {
    id: 4,
    name: "Aurelian Trans Studio Mall",
    address:
      "Trans Studio Mall, Lantai 1, Jl. Gatot Subroto No.289, Bandung 40273",
    city: "Bandung",
    hours: "Mon - Sun: 10:00 – 22:00",
    phone: "+62 22 860 12345",
    mapUrl: "https://maps.google.com/?q=Trans+Studio+Mall+Bandung",
    image: "/images/img-1.jpg",
  },
  {
    id: 5,
    name: "Aurelian Lippo Mall Kuta",
    address: "Lippo Mall Kuta, Jl. Kartika Plaza, Kuta, Bali 80361",
    city: "Bali",
    hours: "Mon - Sun: 10:00 – 23:00",
    phone: "+62 361 765 4321",
    mapUrl: "https://maps.google.com/?q=Lippo+Mall+Kuta+Bali",
    image: "/images/img-1.jpg",
  },
];

const formatTel = (phone: string) => phone.replace(/[\s\+]/g, "");

export default function LocationPage() {
  return (
    <>
      <main className="bg-white pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-black">
              Visit{" "}
              <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Aurelian
              </span>{" "}
              in person
            </h1>
            <p className="text-gray-900 text-lg mt-4">
              Experience our collections first‑hand. Our boutiques offer styling
              advice, exclusive in‑store pieces, and a tailored shopping
              experience.
            </p>
          </div>

          {/* Quick search hint */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2 text-sm text-gray-900">
              <HiOutlineMap className="w-4 h-4 text-gray-700" />
              <span>5 stores across Indonesia – find the one nearest you</span>
            </div>
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={branch.image}
                    alt={`${branch.name} storefront`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-900">
                    {branch.city}
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h2 className="text-xl font-serif font-bold mb-3 text-black">
                    {branch.name}
                  </h2>

                  {/* Address */}
                  <div className="flex gap-2 text-gray-900 mb-3">
                    <HiOutlineMap className="w-5 h-5 shrink-0 mt-0.5 text-gray-700" />
                    <p className="text-sm leading-relaxed">{branch.address}</p>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-2 text-gray-900 mb-3">
                    <HiOutlineClock className="w-5 h-5 shrink-0 mt-0.5 text-gray-700" />
                    <p className="text-sm">{branch.hours}</p>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-2 text-gray-900 mb-4">
                    <HiOutlinePhone className="w-5 h-5 shrink-0 mt-0.5 text-gray-700" />
                    <a
                      href={`tel:${formatTel(branch.phone)}`}
                      className="text-sm hover:text-black transition"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  <div className="flex gap-3 mt-auto pt-2">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                      Get directions{" "}
                      <HiOutlineExternalLink className="w-4 h-4" />
                    </a>
                    <button className="text-sm font-medium text-gray-900 border border-gray-300 px-4 py-2 rounded-full hover:border-black hover:text-black transition">
                      Store details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-20 bg-gray-50 rounded-3xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-black">
                Find us across Indonesia
              </h3>
              <p className="text-gray-900 text-sm mt-1">
                Jakarta | Surabaya | Bandung | Bali
              </p>
            </div>
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/img-1.jpg"
                alt="Map of Indonesia with store locations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center max-w-xs mx-4">
                  <p className="text-sm font-medium text-gray-900">
                    Interactive store map coming soon
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    Use the “Get directions” button for each store
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ / Additional Info */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4 text-black">
              Need help finding us?
            </h3>
            <p className="text-gray-900 max-w-lg mx-auto">
              Our customer service team is ready to assist you with any
              questions about store locations, opening hours, or in‑store
              events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Contact support
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:border-black transition text-gray-900 hover:text-black"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
