import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">🛍️ Mumbaishopper</div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

        {user && (
          <>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
            <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>

            {/*  WISHLIST */}
            <Link
  to="/wishlist"
  onClick={() => setMenuOpen(false)}
  style={{ position: "relative" }}
>
  Wishlist
  {wishlist.length > 0 && (
    <span
      style={{
        marginLeft: "6px",
        background: "red",
        color: "#fff",
        fontSize: "10px",
        borderRadius: "50%",
        padding: "2px 6px",
      }}
    >
      {wishlist.length}
    </span>
  )}
</Link>
</>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        {/* AUTH */}
        {!user ? (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        ) : (
          <div className="user-dropdown" style={{ position: "relative" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* USER ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>

              <span>{user.name || "User"}</span>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  minWidth: "130px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                }}
              >
                <Link
                  to="/profile"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                  style={{ padding: "10px", display: "block" }}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: "10px",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
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
