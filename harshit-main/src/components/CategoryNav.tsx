'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCategories } from '@/lib/products';

export default function CategoryNav() {
  const pathname = usePathname();
  const categories = getCategories();

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === '/'
                ? 'text-black border-b-2 border-black pb-1'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className={`text-sm font-medium transition-colors duration-200 capitalize ${
                pathname === `/category/${category}`
                  ? 'text-black border-b-2 border-black pb-1'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
