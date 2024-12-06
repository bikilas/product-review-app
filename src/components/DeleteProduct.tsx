import React from "react";

const DeleteProduct: React.FC<{ productId: number }> = ({ productId }) => {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await fetch(`/products/${productId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            alert('Product deleted successfully!');
          } else {
            alert('Failed to delete product.');
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Product
      </button>
    );
  };
  
  export default DeleteProduct;
  