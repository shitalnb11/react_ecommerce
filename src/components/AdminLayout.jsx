import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./adminLayout.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-wrapper">
      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h3 className="sidebar-title">Admin Panel</h3>

        <ul className="nav-links">
          <li>
            <Link
              to="/admin/dashboard"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/products"
              onClick={() => setSidebarOpen(false)}
            >
              <FaBox /> Products
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              onClick={() => setSidebarOpen(false)}
            >
              <FaShoppingCart /> Orders
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              onClick={() => setSidebarOpen(false)}
            >
              <FaUser /> Users
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TOP BAR */}
        <div className="topbar">
          <button
            className="menu-btn d-md-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h4>Admin</h4>

          <div className="topbar-right">
            <span>Welcome, {user?.name}</span>
            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <Outlet />
      </main>
    </div>
  );
}
