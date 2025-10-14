"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/products";

interface CartItem {
	product: Product;
	quantity: number;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
	getTotalPrice: () => number;
	getTotalItems: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isClient, setIsClient] = useState(false);

	// Load cart from localStorage on mount
	useEffect(() => {
		setIsClient(true);
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			try {
				setCartItems(JSON.parse(savedCart));
			} catch (error) {
				console.error("Error loading cart from localStorage:", error);
			}
		}
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (isClient) {
			localStorage.setItem("cart", JSON.stringify(cartItems));
		}
	}, [cartItems, isClient]);

	const addToCart = (product: Product) => {
		setCartItems((prev) => {
			const existingItem = prev.find((item) => item.product.id === product.id);
			if (existingItem) {
				return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}
			return [...prev, { product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: number) => {
		setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
	};

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}
		setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const getTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
	};

	const getTotalItems = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getTotalPrice,
				getTotalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
