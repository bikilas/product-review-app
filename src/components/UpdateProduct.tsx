import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProduct: React.FC<{ productId: number }> = ({ productId }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate(); // For navigation after update

  // Fetch product details
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setError(null); // Clear any previous error
      } else {
        setError('Failed to fetch product details.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Error fetching product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle product update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure that all fields are filled
    if (!product.name || !product.description || !product.price || !product.category) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        navigate(`/products/${productId}`); // Redirect to product detail page
      } else {
        setError('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('An error occurred while updating the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        placeholder="Product Name"
        disabled={loading}
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        placeholder="Product Description"
        disabled={loading}
      ></textarea>

      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        placeholder="Price"
        disabled={loading}
      />

      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        placeholder="Category"
        disabled={loading}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
};

export default UpdateProduct;
