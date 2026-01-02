import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const addReview = (productId, user, rating, comment) => {
    const newReview = {
      id: Date.now(),
      productId,
      user,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const getProductReviews = (productId) =>
    reviews.filter(r => r.productId === productId);

  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / productReviews.length).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, deleteReview, getProductReviews, getAverageRating }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
