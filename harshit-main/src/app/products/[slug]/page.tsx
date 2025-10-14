"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { getProductBySlug } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
	params: {
		slug: string;
	};
}

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Assume you have an array called products
  const sortedProducts = [...products].sort((a, b) => 
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div>
      {/* Add this button at the top of your product list */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>
      {/* Render sorted products */}
      <div>
        {sortedProducts.map(product => (
          // ...your code to render each product...
        ))}
      </div>
    </div>
  );
}
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

				{/* Product Details */}
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
						<p className="text-lg text-gray-600 capitalize">{product.category}</p>
					</div>

					<div className="text-3xl font-bold text-gray-900">${product.price}</div>

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
		</div>
	);
}
