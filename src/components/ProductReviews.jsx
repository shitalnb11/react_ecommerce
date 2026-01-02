import React, { useState } from "react";
import { useReview } from "../context/ReviewContext";
import { useAuth } from "../context/AuthContext";

const ProductReviews = ({ productId }) => {
  const { getProductReviews, addReview, deleteReview, getAverageRating } = useReview();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviews = getProductReviews(productId);
  const avgRating = getAverageRating(productId);

  const handleAddReview = () => {
    if (!user) return alert("Login first to add review");
    if (!comment) return alert("Please write a comment");
    addReview(productId, user.name, rating, comment);
    setComment("");
    setRating(5);
  };

  return (
    <div className="reviews-section mt-4">
      <h4>
        Reviews ⭐ {avgRating} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
      </h4>

      {/* Add Review */}
      {user && (
        <div className="add-review mb-3">
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="form-select mb-2">
            <option value={5}>⭐⭐⭐⭐⭐ 5</option>
            <option value={4}>⭐⭐⭐⭐ 4</option>
            <option value={3}>⭐⭐⭐ 3</option>
            <option value={2}>⭐⭐ 2</option>
            <option value={1}>⭐ 1</option>
          </select>
          <textarea
            className="form-control mb-2"
            placeholder="Write your review"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddReview}>Submit Review</button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(r => (
          <div key={r.id} className="review border p-2 mb-2 rounded">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{r.user}</strong>
              <span>⭐ {r.rating}</span>
            </div>
            <p>{r.comment}</p>
            <small className="text-muted">{new Date(r.date).toLocaleString()}</small>

            {/* Admin delete */}
            {user?.role === "admin" && (
              <button
                className="btn btn-sm btn-danger mt-1"
                onClick={() => deleteReview(r.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReviews;
