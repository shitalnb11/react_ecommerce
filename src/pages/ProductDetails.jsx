import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3>Product not found</h3>
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Image Column */}
        <div className="col-md-6" style={{ position: "relative", zIndex: 1 }}>
          <img
            src={product.image}
            className="img-fluid"
            alt={product.title}
            style={{ pointerEvents: "none" }} // 🔹 ensures image doesn't block clicks
          />
        </div>

        {/* Details Column */}
        <div className="col-md-6" style={{ position: "relative", zIndex: 2 }}>
          <h2>{product.title}</h2>
          <h4 className="text-success">₹{product.price}</h4>
          <p>{product.details}</p>

          {/* Add to Cart Button */}
          <button
            className="btn btn-warning me-2 mb-2"
            style={{ position: "relative", zIndex: 10 }}
            onClick={() => {
              console.log("CLICKED:", product);
              addToCart(product);
              navigate("/cart"); // optional, remove if you don't want auto navigation
            }}
          >
            Add to Cart
          </button>

          {/* Back Button */}
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
