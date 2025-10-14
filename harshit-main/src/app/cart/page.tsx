"use client";

import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
	const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

	if (cartItems.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
					<p className="text-gray-600 mb-8">Your cart is empty</p>
					<Link
						href="/"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Cart Items */}
				<div className="lg:col-span-2 space-y-4">
					{cartItems.map((item) => (
						<div
							key={item.product.id}
							className="bg-white rounded-lg border border-gray-200 p-4"
						>
							<div className="flex items-center space-x-4">
								<div className="w-20 h-20 relative overflow-hidden rounded-md bg-gray-100">
									<Image
										src={item.product.image}
										alt={item.product.name}
										fill
										className="object-cover"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center&auto=format&q=80";
										}}
									/>
								</div>

								<div className="flex-1">
									<h3 className="font-medium text-gray-900">{item.product.name}</h3>
									<p className="text-gray-500 text-sm">${item.product.price}</p>
								</div>

								<div className="flex items-center space-x-2">
									<button
										onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
										className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
									>
										-
									</button>
									<span className="w-8 text-center">{item.quantity}</span>
									<button
										onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
										className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
									>
										+
									</button>
								</div>

								<div className="text-right">
									<p className="font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
									<button
										onClick={() => removeFromCart(item.product.id)}
										className="text-red-600 text-sm hover:text-red-800"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Order Summary */}
				<div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
					<h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

					<div className="space-y-3 mb-6">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Subtotal</span>
							<span className="text-gray-900">${getTotalPrice().toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Shipping</span>
							<span className="text-gray-900">Free</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Tax</span>
							<span className="text-gray-900">$0.00</span>
						</div>
						<div className="border-t border-gray-200 pt-3">
							<div className="flex justify-between">
								<span className="text-base font-medium text-gray-900">Total</span>
								<span className="text-base font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
							</div>
						</div>
					</div>

					<button className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors mb-4">Checkout</button>

					<button
						onClick={clearCart}
						className="w-full text-gray-600 py-2 px-4 rounded-md font-medium hover:text-gray-800 transition-colors"
					>
						Clear Cart
					</button>
				</div>
			</div>
		</div>
	);
}
