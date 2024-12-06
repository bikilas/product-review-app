import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // For icons
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductFilters from './components/ProductFilters';
import ProductReview from './components/ProductReview';
import SearchBar from './components/SearchBar';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import { Product } from './types';

// Import images and other assets
import product1Image from './assets/img/product-1.png';
import product2Image from './assets/img/product-2.png';
import product3Image from './assets/img/product-3.png';
import product4Image from './assets/img/product-4.png';
import product5Image from './assets/img/product-5.png';
import product6Image from './assets/img/product-6.png';
import product7Image from './assets/img/product-7.png';
import product8Image from './assets/img/product-8.png';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Product data
  const productList: Product[] = [
    {
      id: 1,
      title: 'Smartphone',
      price: 699.99,
      description: 'High-end smartphone.',
      imageUrl: product1Image,
    },
    {
      id: 2,
      title: 'Laptop',
      price: 1299.99,
      description: 'Professional laptop.',
      imageUrl: product2Image,
    },
    {
      id: 3,
      title: 'Headphones',
      price: 199.99,
      description: 'Noise-cancelling headphones.',
      imageUrl: product3Image,
    },
    {
      id: 4,
      title: 'SmartBag',
      price: 140.99,
      description: 'Chic and versatile accessory with integrated technology.',
      imageUrl: product4Image,
    },
    {
      id: 5,
      title: 'SmartDress',
      price: 399.99,
      description: 'Fashionable dress with LED lighting and health sensors.',
      imageUrl: product5Image,
    },
    {
      id: 6,
      title: 'SmartShoes',
      price: 899.99,
      description: 'Innovative shoes with fitness tracking and app connectivity.',
      imageUrl: product6Image,
    },
    {
      id: 7,
      title: 'SmartT-shirt',
      price: 49.99,
      description: 'Comfortable T-shirt with smart features.',
      imageUrl: product7Image,
    },
    {
      id: 8,
      title: 'Gym Wears',
      price: 349.99,
      description: 'Durable activewear with ergonomic fits.',
      imageUrl: product8Image,
    },
  ];

  // Filter products based on search term
  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product Review App</h1>

        {/* Navigation Menu */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-10 p-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-500">ProductApp</div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-blue-500 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
              <Link to="/create" className="text-blue-500 hover:text-blue-700">Create Product</Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 flex flex-col space-y-2">
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/create"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Product
              </Link>
            </div>
          )}
        </nav>

        <div className="mt-16">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <ProductFilters filters={filters} setFilters={setFilters} />
                  <ProductList
                    products={filteredProducts} 
                    onSelect={(product: Product) => {
                      window.location.href = `/products/${product.id}`;
                    }}
                  />
                </>
              }
            />

            {/* Create Product */}
            <Route path="/create" element={<CreateProduct />} />

            {/* Update Product */}
            <Route
              path="/update/:id"
              element={<UpdateProductWrapper productList={productList} />}
            />

            {/* Delete Product */}
            <Route
              path="/delete/:id"
              element={<DeleteProductWrapper productList={productList} />}
            />

            {/* Product Detail Page */}
            <Route
              path="/products/:id"
              element={<ProductDetailWithParams productList={productList} />}
            />

            {/* Review Page */}
            <Route
              path="/products/:id/review"
              element={<ProductReview />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Wrapper for Update Product to pass product details
const UpdateProductWrapper: React.FC<{ productList: Product[] }> = ({ productList }) => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '', 10);
  const product = productList.find((p) => p.id === productId);
  return product ? <UpdateProduct productId={productId} /> : <p>Product not found.</p>;
};

// Wrapper for Delete Product to pass product details
const DeleteProductWrapper: React.FC<{ productList: Product[] }> = ({ productList }) => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '', 10);
  const product = productList.find((p) => p.id === productId);
  return product ? <DeleteProduct productId={productId} /> : <p>Product not found.</p>;
};

// Wrapper for Product Detail to pass product details
const ProductDetailWithParams: React.FC<{ productList: Product[] }> = ({ productList }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = productList.find((p) => p.id === parseInt(id || '', 10));

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-4">
        <p>Product not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <ProductDetail product={product} onBack={() => navigate('/')} />
      <button
        onClick={() => navigate(`/products/${id}/review`)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Leave a Review
      </button>
    </>
  );
};

export default App;
