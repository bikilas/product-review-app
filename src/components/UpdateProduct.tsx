import React, { useState } from "react";

const UpdateProduct: React.FC<{ productId: number }> = ({ productId }) => {
    const [product, setProduct] = useState({
      name: '',
      description: '',
      price: 0,
      category: '',
    });
  
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    React.useEffect(() => {
      fetchProductDetails();
    }, [productId]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
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
        } else {
          alert('Failed to update product.');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  
    return (
      <form onSubmit={handleUpdate} className="p-4">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        ></textarea>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    );
  };
  
  export default UpdateProduct;
  