"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/products";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const fallbackImage = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&auto=format&q=80`;

	return (
		<Link
			href={`/products/${product.slug}`}
			className="group"
		>
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
				<div className="aspect-square relative overflow-hidden bg-gray-100">
					{imageLoading && (
						<div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
							<svg
								className="w-8 h-8 text-gray-400"
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
						className="object-cover group-hover:scale-105 transition-transform duration-200"
						onError={() => setImageError(true)}
						onLoad={() => setImageLoading(false)}
					/>
				</div>
				<div className="p-4">
					<h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
					<p className="text-gray-500 text-xs mb-2 line-clamp-2">{product.description}</p>
					<div className="flex items-center justify-between">
						<span className="text-lg font-semibold text-gray-900">${product.price}</span>
						<span className="text-xs text-gray-400 capitalize">{product.category}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
