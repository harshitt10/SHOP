import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;

}

interface Props {
  products: Product[];
}

const Category: React.FC<Props> = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSortedProducts(products); // initialize with products prop
  }, [products]);

  const sortHighToLow = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  const sortLowToHigh = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={sortHighToLow} style={{ marginRight: '0.5rem' }}>
          High to Low
        </button>
        <button onClick={sortLowToHigh}>
          Low to High
        </button>
      </div>
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
