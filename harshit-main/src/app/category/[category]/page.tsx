"use client";

import { useState } from "react";
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const products = getAllProducts();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Discover our collection of premium products</p>
      </div>

      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(e.target.value as "asc" | "desc" | "default")
        }
        className="border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="default">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
