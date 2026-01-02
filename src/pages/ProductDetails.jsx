import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useReview } from "../hooks/useReview";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getProductReviews, getAverageRating, addReview, deleteReview } =
    useReview();
  const { user } = useAuth();

  const product = products.find((p) => String(p.id) === String(id));
  const productReviews = product ? getProductReviews(product.id) : [];
  const avgRating = product ? getAverageRating(product.id) : 0;

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h3>Product not found</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddReview = () => {
    if (!user) return alert("Login first");
    if (!reviewComment.trim()) return alert("Write a review");

    addReview(product.id, user.name, reviewRating, reviewComment);
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <div className="container my-5">
      <div className="row g-5">
        {/* IMAGE CARD */}
        <div className="col-md-6">
          <div className="position-relative shadow rounded p-3 bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: "450px", objectFit: "cover", width: "100%" }}
            />

            <button
              className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle shadow-sm"
              onClick={() =>
                isInWishlist(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
            >
              {isInWishlist(product.id) ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>

          <div className="d-flex align-items-center gap-3 my-3">
            <span className="badge bg-success fs-6">
              ⭐ {avgRating}
            </span>
            <h4 className="text-primary mb-0">₹{product.price}</h4>
          </div>

          <p className="text-muted">{product.details}</p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning px-4"
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/products")}>
              Back
            </button>
          </div>

          {/* REVIEWS */}
          <div className="mt-5">
            <h4 className="fw-bold mb-3">Customer Reviews</h4>

            {user && (
              <div className="card p-3 mb-4 shadow-sm">
                <select
                  className="form-select mb-2"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {"⭐".repeat(n)} ({n})
                    </option>
                  ))}
                </select>

                <textarea
                  className="form-control mb-2"
                  placeholder="Write your review..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />

                <button className="btn btn-primary w-100" onClick={handleAddReview}>
                  Submit Review
                </button>
              </div>
            )}

            {productReviews.length === 0 ? (
              <p className="text-muted">No reviews yet.</p>
            ) : (
              productReviews.map((r) => (
                <div key={r.id} className="card p-3 mb-3 shadow-sm">
                  <div className="d-flex justify-content-between">
                    <strong>{r.user}</strong>
                    <span className="text-warning">
                      {[...Array(r.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 mb-1">{r.comment}</p>
                  <small className="text-muted">
                    {new Date(r.date).toLocaleString()}
                  </small>

                  {user?.role === "admin" && (
                    <button
                      className="btn btn-sm btn-danger mt-2"
                      onClick={() => deleteReview(r.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
