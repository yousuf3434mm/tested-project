"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import photo from "@/img/image.jpg";

export default function ProductDetail({ product }) {
  const [cartMsg, setCartMsg] = useState("");

  const handleAddToCart = () => {
        setCartMsg("✅ Added to cart!");
    setTimeout(() => setCartMsg(""), 2000);
  };

  return (
    <section className="min-h-screen bg-purple-900 text-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-purple-800 rounded-xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative h-64 w-full">
          <Image
            src={photo /* product.image || photo */}
            alt={product.title}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="p-8 space-y-4">
          <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          <p className="text-purple-200">{product.description}</p>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-semibold text-white">
              ৳ {Number(product.price).toFixed(2)}
            </span>
            <span className="text-sm text-purple-300">
              Available: {Number(product.stock).toFixed(0)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-white text-purple-900 font-semibold px-6 py-2 rounded-md shadow hover:shadow-lg transition"
          >
            🛒 Add to Cart
          </button>
          {cartMsg && (
            <p className="text-green-300 text-sm font-medium mt-1">{cartMsg}</p>
          )}

          <Link
            href="/"
            className="inline-block mt-6 text-purple-200 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Reviews Section */}
        <div className="p-8 border-t border-purple-700 mt-6 bg-purple-800">
          <h2 className="text-xl font-bold mb-4">📝 Reviews</h2>
          <div className="space-y-4">
            <div className="bg-purple-700 p-4 rounded-lg shadow">
              <p className="text-sm">"Great product! Highly recommended."</p>
              <p className="text-xs text-purple-300 mt-1">— Sakib Hasan</p>
            </div>
            <div className="bg-purple-700 p-4 rounded-lg shadow">
              <p className="text-sm">
                "Exactly what I needed. Worth the price!"
              </p>
              <p className="text-xs text-purple-300 mt-1">— Nila Ahmed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
