import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">🛍️ Mumbaishopper</div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
         <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>

        {user?.role === "admin" && (
          <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        )}

        {!user ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            {/* <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link> */}
          </>
        ) : (
          <div className="user-dropdown" style={{ position: "relative" }}>
            <button
              className="user-name-btn"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: "none", border: "none" }}
            >
              {/* User Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>

              {/* User Name */}
              <span>{user.name || "User"}</span>

              {/* Dropdown Arrow */}
              <span></span>
            </button>

            {dropdownOpen && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  zIndex: 1000,
                  minWidth: "120px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                }}
              >
                <Link
                  to="/profile"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                  style={{ padding: "8px 12px" }}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
