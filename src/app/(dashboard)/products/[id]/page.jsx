"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import photo from "@/img/image.jpg";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

/* 🔢 Currency formatter */
const fmt = new Intl.NumberFormat("bn-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 2,
});

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ───────── ডেটা ফেচ ───────── */
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("404");
        const { product } = await res.json();
        setProduct(product);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ───────── লোডিং স্কেলেটন ───────── */
  if (loading)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6">
        <div className="w-full max-w-md space-y-6 animate-pulse">
          <div className="overflow-hidden rounded-3xl bg-purple-900/50 shadow-2xl ring-1 ring-purple-700/50 backdrop-blur-lg">
            {/* Image Skeleton */}
            <div className="h-64 w-full bg-purple-800/60" />

            {/* Content Skeleton */}
            <div className="space-y-4 px-6 py-6">
              {/* Title */}
              <div className="h-6 w-3/4 bg-purple-700/70 rounded-md" />

              {/* Description lines */}
              <div className="h-4 w-full bg-purple-700/50 rounded-md" />
              <div className="h-4 w-5/6 bg-purple-700/50 rounded-md" />
              <div className="h-4 w-2/3 bg-purple-700/50 rounded-md" />

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-5 w-20 bg-purple-700/60 rounded-md" />
                <div className="h-5 w-24 bg-purple-700/60 rounded-md" />
                <div className="h-5 w-20 bg-purple-700/60 rounded-md" />
                <div className="h-5 w-24 bg-purple-700/60 rounded-md" />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <div className="h-10 flex-1 rounded-xl bg-purple-700/60" />
                <div className="h-10 flex-1 rounded-xl bg-purple-700/40" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  
  

  if (!product) return null;

  const inStock = product.stock > 0;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -25, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* ───────── Card ───────── */}
          <Card className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-purple-800/40 backdrop-blur-md shadow-2xl ring-1 ring-purple-500/20 transition hover:shadow-purple-900/50">
            {/* ───────── হেডার: ছবি ───────── */}
            <CardHeader className="p-0">
              <Image
                src={product.image ?? photo}
                alt={product.title}
                width={800}
                height={800}
                priority
                className="h-64 w-full object-cover object-center aspect-[4/3] sm:aspect-video transition-transform duration-300 hover:scale-105"
              />
              {/* স্টক ব্যাজ */}
              <Badge
                className={`absolute top-4 right-4 backdrop-blur-sm ${
                  inStock
                    ? "bg-green-600/80 hover:bg-green-700/80"
                    : "bg-red-600/80"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </CardHeader>

            {/* ───────── কনটেন্ট ───────── */}
            <CardContent className="space-y-6 px-6 py-6 text-purple-100">
              {/* টাইটেল + বিবরণ */}
              <div>
                <CardTitle className="text-2xl text-white">
                  {product.title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-sm leading-6 text-purple-200">
                  {product.description}
                </CardDescription>
              </div>

              {/* প্রাইস & কোয়ান্টিটি */}
              <div className="grid grid-cols-2 gap-2 text-lg">
                <span className="font-medium">Price:</span>
                <span>{fmt.format(product.price)}</span>

                <span className="font-medium">Available:</span>
                <span>{product.stock}</span>
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="lg"
                  disabled={!inStock}
                  className={`flex-1 text-base ${
                    inStock
                      ? "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"
                      : "cursor-not-allowed bg-purple-600/40"
                  }`}
                >
                  {inStock ? "Add to Cart" : "Sold Out"}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 bg-purple-500/20 text-base text-purple-100 ring-1 ring-purple-300/30 hover:bg-purple-500/30 active:bg-purple-500/40"
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
