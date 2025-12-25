import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Men's Stylish Jacket",
      image: "/src/assets/img/1img.jpeg",
      price: "₹1299",
      details: "Premium winter jacket made with high-quality wool and leather."
    },
    {
      id: 2,
      title: "Women's Designer Handbag",
      image: "/src/assets/img/4img.jpeg",
      price: "₹999",
      details: "Elegant and durable handbag perfect for daily use."
    },
    {
      id: 3,
      title: "Smart Fitness Watch",
      image: "/src/assets/img/3img.jpeg",
      price: "₹1799",
      details: "Advanced activity tracker with heart rate, sleep & step monitor."
    }
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="text-center py-5">❌ Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart"); // redirect to cart page
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded shadow" alt="" />
        </div>

        {/* Right Content */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <h4 className="text-success mt-2">{product.price}</h4>
          <p className="mt-3">{product.details}</p>

          <button
            className="btn btn-warning px-4 mt-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <br /><br />

          <Link to="/products" className="btn btn-secondary">
            ⬅ Back to Products
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
