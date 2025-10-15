"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";
import { getProductBySlug, getProductsByCategory } from "@/lib/products"; 
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
	params: {
		slug: string;
	};
}


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

	if (!product) {
		notFound();
	}

	const fallbackImage = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop&crop=center&auto=format&q=80`;

    // Data setup for the optional "Similar Products" section below
    const allProducts = getProductsByCategory(product.category).filter(
        (p) => p.slug !== product.slug
    );

    // Sorting logic for the similar products list
    const sortedProducts = useMemo(() => {
        const productsToSort = [...allProducts];
        return productsToSort.sort((a, b) => {
            if (sortOrder === "asc") return a.price - b.price;
            if (sortOrder === "desc") return b.price - a.price;
            return 0;
        });
    }, [allProducts, sortOrder]); 

    // Function to generate button Tailwind classes
    const getSortButtonClasses = (currentOrder: typeof sortOrder) =>
        `px-4 py-2 border rounded-md text-sm font-medium transition ${
            sortOrder === currentOrder
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
        }`;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Main Product Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Product Image (Left Column) */}
				<div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
					{imageLoading && (
						<div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
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
                        sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				</div>

				
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
						<p className="text-lg text-gray-600 capitalize">{product.category}</p>
					</div>

					<div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div> 
                    
                  
                    <div className="flex gap-2 items-center text-sm pt-2">
                        <span className="text-gray-600 font-medium">Sort Similar:</span>
                        <button
                            onClick={() => setSortOrder("asc")}
                            className={getSortButtonClasses("asc")}
                        >
                            Low → High
                        </button>

                        <button
                            onClick={() => setSortOrder("desc")}
                            className={getSortButtonClasses("desc")}
                        >
                            High → Low
                        </button>

                        <button
                            onClick={() => setSortOrder("default")}
                            className={getSortButtonClasses("default")}
                        >
                            Reset
                        </button>
                    </div>
                    {/* ------------------------------------------------------------- */}

					<p className="text-gray-700 leading-relaxed">{product.description}</p>

					<AddToCartButton product={product} />

					<div className="pt-6 border-t border-gray-200">
						<h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
						<ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
							<li>High-quality materials</li>
							<li>Fast shipping</li>
							<li>30-day return policy</li>
							<li>Customer support</li>
						</ul>
					</div>
                    
                    <ProductReviewSection /> 
				</div>
			</div>
            
			{/* --------------------------------------------------------------------- */}
            
         
            {sortedProducts.length > 0 && (
                <div className="mt-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            More in {product.category}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {sortedProducts.length} item{sortedProducts.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                   
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
