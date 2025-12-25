import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Men's Stylish Jacket",
      image: "/src/assets/img/1img.jpeg",
      price: 1299,
      details: "High-quality material, great for winter.",
    },
    {
      id: 2,
      title: "Women's Designer Handbag",
      image: "/src/assets/img/4img.jpeg",
      price: 999,
      details: "Perfect for daily and festive use.",
    },
    {
      id: 3,
      title: "Smart Fitness Watch",
      image: "/src/assets/img/3img.jpeg",
      price: 1799,
      details: "Tracks heart rate, steps, sleep, and more.",
    },
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="text-center py-5">❌ Product Not Found</h2>;
  }

  const handleAdd = () => {
    addToCart(product);   // Cart मध्ये add होईल
    navigate("/cart");    // Cart page ला जाणार
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">

        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <h4 className="text-success mt-2">₹{product.price}</h4>
          <p className="mt-3">{product.details}</p>

          <button
            className="btn btn-warning mt-3 px-4"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default Product;
