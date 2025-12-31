// UserSidebar.jsx
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaShoppingCart } from "react-icons/fa";

export default function UserSidebar() {
  return (
    <aside className="bg-dark text-white p-3" style={{ width: "280px", minWidth: "280px" }}>
      <h4 className="text-center mb-4">User Panel</h4>
      <ul className="nav flex-column gap-2">
        <li><Link to="/user/dashboard" className="nav-link text-white"><FaTachometerAlt className="me-2" /> Dashboard</Link></li>
        <li><Link to="/user/orders" className="nav-link text-white"><FaShoppingCart className="me-2" /> Orders</Link></li>
      </ul>
    </aside>
  );
}
