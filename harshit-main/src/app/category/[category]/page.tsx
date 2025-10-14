"use client";

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

  // Load products
  const allProducts = getProductsByCategory(category);

  // Sorting state
 const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

// Sort products based on selected order
const sortedProducts = [...allProducts].sort((a, b) => {
  if (sortOrder === "asc") return a.price - b.price;
  if (sortOrder === "desc") return b.price - a.price;
  return 0; // default (no sort)
});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Sorting Dropdown */}
        <div className="mt-4 sm:mt-0">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "asc" | "desc" | "default")
            }
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="default">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

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
