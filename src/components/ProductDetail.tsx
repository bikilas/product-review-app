import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleLeaveReview = () => {
    // Navigate to the review page for the current product
    navigate(`/products/${product.id}/review`);
  };

  return (
    <div className="product-detail p-4">
      <button onClick={onBack} className="text-blue-500 hover:underline mb-4">
        ← Back to Products
      </button>

      <button
        onClick={handleLeaveReview} // Corrected navigation function
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Leave a Review
      </button>

      <div className="flex flex-col md:flex-row">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded shadow-lg"
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <strong className="text-xl mt-4 block">${product.price.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
