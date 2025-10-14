"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";
// Assumes you have src/lib/products.ts and src/data/products.json
import { getProductBySlug, getProductsByCategory } from "@/lib/products"; 
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Helper component for a mock review section
function ProductReviewSection() {
  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Customer Reviews (4.5/5)
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-900">
            Great quality for the price! ⭐⭐⭐⭐⭐
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
   const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

  // Sort products based on selected order
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0; // Default (no sorting)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header + Sorting Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
            {category}
          </h1>
          <p className="text-gray-600">
            {sortedProducts.length} product
            {sortedProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Sorting Buttons */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
              sortOrder === "asc"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
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
          >
            Reset
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
}

