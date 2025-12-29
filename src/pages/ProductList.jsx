import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-3 mt-3" key={p.id}>
              <div className="card h-100 shadow-sm">

                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "220px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300")
                  }
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>

                  <p className="text-success fw-bold">₹{p.price}</p>

                  <p className="text-muted small">
                    {p.details || "No description available"}
                  </p>

                  <div className="mt-auto">
                    <button
                      className="btn btn-warning w-100 mb-2"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/productDetails/${p.id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
