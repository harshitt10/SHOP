'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { Product } from '@/lib/products';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    
    // Show feedback for a brief moment
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
        isAdding
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-black text-white hover:bg-gray-800'
      }`}
    >
      {isAdding ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
