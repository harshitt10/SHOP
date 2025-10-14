import { useState } from "react";

// Example: Replace this with your actual data fetching logic
const products = [
  { id: 1, name: "Product A", price: 50, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product B", price: 25, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product C", price: 100, image: "https://via.placeholder.com/150" },
];

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort products by price
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Sort Buttons */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${sortOrder === "asc" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"} hover:bg-blue-700`}
            onClick={() => setSortOrder("asc")}
          >
            Low to High
          </button>
          <button
            className={`px-4 py-2 rounded ${sortOrder === "desc" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"} hover:bg-blue-700`}
            onClick={() => setSortOrder("desc")}
          >
            High to Low
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center bg-white">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            {/* Add to cart or other buttons here */}
          </div>
        ))}
      </div>
    </div>
  );
}
