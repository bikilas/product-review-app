import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  text: string;
  author: string;
}

const ProductReview: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Retrieve productId from the URL
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewAuthor, setReviewAuthor] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!reviewAuthor.trim() || !reviewText.trim()) {
      setError('Both fields are required.');
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      text: reviewText.trim(),
      author: reviewAuthor.trim(),
    };

    setReviews((prev) => [...prev, newReview]);
    setReviewText('');
    setReviewAuthor('');
  };

  return (
    <div className="p-4 border rounded bg-gray-100 shadow-sm">
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="text-blue-500 mb-4 hover:underline"
      >
        ← Back to Product Details
      </button>

      <h3 className="text-xl font-bold mb-4">Reviews for Product ID: {productId}</h3>

      {reviews.length > 0 ? (
        <ul className="space-y-2">
          {reviews.map((review) => (
            <li key={review.id} className="p-2 border rounded bg-white shadow-sm">
              <p className="font-semibold">{review.author}</p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      )}

      <form onSubmit={handleReviewSubmit} className="mt-4">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-2">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="author"
            type="text"
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter your name"
            value={reviewAuthor}
            onChange={(e) => setReviewAuthor(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="reviewText"
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReview;
