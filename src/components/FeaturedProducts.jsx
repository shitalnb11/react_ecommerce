import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function FeaturedProducts() {
  const { products } = useProducts();

  return (
    <section className="products-section">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} className="prod-img" alt={p.title} />
            <h3>{p.title}</h3>
            <p>₹{p.price}</p>

            <Link to={`/productDetails/${p.id}`} className="btn1">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
