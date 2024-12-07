import React, { useState } from 'react';

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.name === 'price' ? +e.target.value : e.target.value, // Parse price as number
    });
  };

  // Validate input fields
  const isValid = () => {
    const { name, description, price, category } = product;
    return name && description && price > 0 && category;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      setError('All fields are required, and price must be greater than 0.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product created successfully!');
        setProduct({ name: '', description: '', price: 0, category: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create product.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      {/* Name Input */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      />

      {/* Description Input */}
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      ></textarea>

      {/* Price Input */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        min={0}
      />

      {/* Category Input */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full text-white px-4 py-2 rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Creating Product...' : 'Create Product'}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default CreateProduct;
