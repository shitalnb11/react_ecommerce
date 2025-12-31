import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* SIDEBAR */}
      <aside className="bg-dark text-white p-3" style={{ width: "280px", minWidth: "280px" }}>
        <h4 className="text-center mb-4">User Panel</h4>

        <ul className="nav flex-column gap-2">
          <li>
            <Link to="/user/dashboard" className="nav-link text-white">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user/orders" className="nav-link text-white">
              <FaShoppingCart className="me-2" /> My Orders
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Welcome, {user?.name}</h3>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="card p-4">
          <h5>Profile Info</h5>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </main>
    </div>
  );
}
