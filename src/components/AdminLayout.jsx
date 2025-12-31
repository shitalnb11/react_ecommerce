import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex bg-light" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        className="bg-white text-dark p-3"
        style={{ width: "280px", minWidth: "280px" }}
      >
        <h3 className="text-center mb-4 " style={{color:"#ff0066"}}>Admin Panel</h3>

        <ul className="nav flex-column gap-3">
          <li>
            <Link to="/admin/dashboard" className="nav-link text-dark">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="nav-link text-dark">
              <FaBox className="me-2" /> Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="nav-link text-dark">
              <FaShoppingCart className="me-2" /> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="nav-link text-dark">
              <FaUser className="me-2" /> Users
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 p-4">
        {/* TOP BAR */}
        {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Admin</h3>

          <div className="d-flex align-items-center gap-3">
            <span>Welcome, {user?.name}</span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div> */}

        {/* PAGE CONTENT */}
        <Outlet />
      </main>
    </div>
  );
}
