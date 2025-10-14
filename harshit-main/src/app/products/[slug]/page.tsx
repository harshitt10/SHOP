"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!product) {
    notFound();
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop&crop=center&auto=format&q=80";

  // Get similar products (same category, exclude current)
  const allProducts = getProductsByCategory(product.category).filter(
    (p) => p.id !== product.id
  );

  // Sorting state: asc = low→high, desc = high→low, default = no sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

  // Apply sorting
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <Image
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 capitalize">
              {product.category}
            </p>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${product.price}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <AddToCartButton product={product} />

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• High-quality materials</li>
              <li>• Fast shipping</li>
              <li>• 30-day return policy</li>
              <li>• Customer support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {allProducts.length > 0 && (
        <div className="mt-16">
          {/* Header + Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Similar Products
            </h2>

            {/* Sorting Buttons (same as CategoryPage) */}
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => setSortOrder("asc")}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                  sortOrder === "asc"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
                aria-label="Sort Low to High"
              >
                Low → High
              </button>

              <button
                onClick={() => setSortOrder("desc")}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                  sortOrder === "desc"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
                aria-label="Sort High to Low"
              >
                High → Low
              </button>

              <button
                onClick={() => setSortOrder("default")}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                  sortOrder === "default"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
                aria-label="Reset Sorting"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Similar Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
