import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Shop the Latest Trends</h1>
        <p>Exclusive deals on top brands — only at Mumbaishopper!</p>

        {/* ✅ FIX */}
        <Link to="/products" className="btn">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
 