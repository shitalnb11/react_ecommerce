import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            We provide high-quality fashion, accessories,
            <br /> and lifestyle products at the best prices.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Customer Support</h3>
          <ul>
            <li><Link to="/Cart">Cart</Link></li>
            <li><Link to="/Checkout">Checkout</Link></li>
            <li><Link to="/Products">Shop</Link></li>
            <li><Link to="/Contact">Help</Link></li>
          </ul>
        </div>

       <div className="footer-column">
  <h3>Contact</h3>
  <ul style={{ listStyle: "none", padding: 0 }}>
    <li style={{ marginBottom: "6px" }}>
      <a 
        href="tel:+919876543210" 
        style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
      >
        📞 +91 9876543210
      </a>
    </li>

    <li style={{ marginBottom: "6px" }}>
      <a 
        href="mailto:support@example.com"
        style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
      >
        📧 support@example.com
      </a>
    </li>

    <li>
      <Link 
        to="/contact"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        📍 Mumbai, India
      </Link>
    </li>
  </ul>
</div>

      </div>

      <div className="footer-bottom">
        © 2025 Mumbaishopper — All Rights Reserved.
      </div>
    </footer>
  );
}
