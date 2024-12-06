import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            onSelect(product); // Set the selected product
            navigate(`/products/${product.id}`); // Navigate to the product detail page
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600 truncate">{product.description}</p>
          <strong className="text-blue-500 mt-2 block">${product.price.toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
