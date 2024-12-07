import React, { useState } from 'react';

const DeleteProduct: React.FC<{ productId: number }> = ({ productId }) => {
  const [loading, setLoading] = useState(false); // For tracking loading state

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`/products/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Product deleted successfully!');
          // Optionally, redirect the user after success
          window.location.href = '/'; // Redirect to home page
        } else {
          alert('Failed to delete product.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred while deleting the product.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading} // Disable button while loading
      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Deleting...' : 'Delete Product'}
    </button>
  );
};

export default DeleteProduct;
