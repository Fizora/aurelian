// app/cart/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuTrash2,
  LuShoppingBag,
  LuArrowLeft,
  LuMinus,
  LuPlus,
} from "react-icons/lu";

// Sample cart item type
interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  size?: string;
  quantity: number;
}

// Initial cart items (matching shop products)
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    brand: "AURELIAN",
    price: 1299000,
    originalPrice: 1899000,
    image: "/images/showcase/oversized-blazer.jpg",
    size: "M",
    quantity: 1,
  },
  {
    id: 3,
    name: "Cropped Knit Vest",
    brand: "AURELIAN",
    price: 599000,
    originalPrice: 799000,
    image: "/images/showcase/cropped-knit.jpg",
    size: "S",
    quantity: 2,
  },
  {
    id: 5,
    name: "Technical Cargo Jacket",
    brand: "AURELIAN",
    price: 2199000,
    originalPrice: 3199000,
    image: "/images/showcase/technical-cargo-jacket.jpg",
    size: "L",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 1000000 ? 0 : 50000; // Free shipping over Rp1.000.000
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `Rp${price.toLocaleString("id-ID")}`;

  return (
    <>
      <main className="bg-white min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-700 mt-2">{cartItems.length} items</p>
          </div>

          {cartItems.length === 0 ? (
            // Empty cart state
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                <LuShoppingBag size={48} className="text-gray-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Let's
                fix that.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-md"
              >
                <LuArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items */}
              <div className="flex-1">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    const discount = item.originalPrice
                      ? Math.round((1 - item.price / item.originalPrice) * 100)
                      : 0;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0"
                      >
                        {/* Product image */}
                        <div className="sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product details */}
                        <div className="flex-1 flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <p className="text-xs font-mono text-gray-500">
                              {item.brand}
                            </p>
                            <h3 className="font-serif font-bold text-lg text-gray-900">
                              {item.name}
                            </h3>
                            {item.size && (
                              <p className="text-sm text-gray-600 mt-1">
                                Size: {item.size}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition"
                              >
                                <LuTrash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="sm:w-32 text-left sm:text-center">
                            <p className="font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </p>
                            )}
                            {discount > 0 && (
                              <p className="text-xs text-green-600">
                                -{discount}%
                              </p>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="sm:w-32 flex items-center justify-start sm:justify-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 transition"
                              aria-label="Decrease quantity"
                            >
                              <LuMinus size={14} />
                            </button>
                            <span className="w-8 text-center text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 transition"
                              aria-label="Increase quantity"
                            >
                              <LuPlus size={14} />
                            </button>
                          </div>

                          {/* Total */}
                          <div className="sm:w-32 text-left sm:text-right">
                            <p className="font-bold text-gray-900">
                              {formatPrice(itemTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue shopping link */}
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition font-medium"
                  >
                    <LuArrowLeft size={18} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:w-96">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(tax)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="mt-6">
                    <label
                      htmlFor="promo"
                      className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2"
                    >
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="promo"
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black text-sm"
                      />
                      <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <button className="w-full mt-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition shadow-md">
                    Proceed to Checkout
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Free shipping on orders over Rp1.000.000
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
