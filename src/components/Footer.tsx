"use client";

import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscription logic
    alert(`Thanks for subscribing! (Demo: ${email})`);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div>
            <h2 className="font-mono text-2xl font-black tracking-tighter">
              AURELIAN.
            </h2>
            <p className="text-gray-400 text-sm mt-4 max-w-xs">
              Premium streetwear & contemporary essentials for the modern
              explorer.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-400 hover:text-white transition"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-white transition">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-white transition">
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/accessories"
                  className="hover:text-white transition"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-white transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-white transition"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Insider Access</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get 10% off your first order and exclusive early access to drops.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-4 py-2 rounded-full text-black text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <HiOutlineSparkles size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Aurelian. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-2">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
