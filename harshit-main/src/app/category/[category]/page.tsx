"use client"; // 👈 Required for useState and interactive buttons

import { useState } from "react";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categories = getCategories();

  if (!categories.includes(category)) {
    notFound();
  }

  const allProducts = getProductsByCategory(category);

  // Track sorting order
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
