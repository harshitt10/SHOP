"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2"
					>
						<div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<span className="font-semibold text-xl">Store</span>
					</Link>

					{/* Cart Icon */}
					<CartIcon />
				</div>
			</div>
		</header>
	);
}
