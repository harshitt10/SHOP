import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categories = getCategories();
  
  if (!categories.includes(category)) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {category}
        </h1>
        <p className="text-gray-600">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
