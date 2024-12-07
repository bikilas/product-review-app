import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types'; // Assuming you have a Product type defined in types

interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  // You can still use the API request if required, but for now, products are being passed as props
  // Commenting out the API request logic since you are passing products directly as props
  useEffect(() => {
    // If you plan to load data on component mount, use this
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products'); // Replace with your API endpoint
        // setProducts(response.data); // You can set the products if you need to fetch them
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center text-blue-500 mt-4">Loading products...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  // No products state
  if (products.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No products available. Please check back later.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelect(product)} // Call onSelect prop when a product is clicked
        >
          {/* Fallback image in case product.imageUrl is missing */}
          <img
            src={product.imageUrl || 'https://via.placeholder.com/150'}
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
