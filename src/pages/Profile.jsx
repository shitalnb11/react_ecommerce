// Profile.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const isAdmin = user.role === "admin";

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="card-header bg-primary text-white text-center rounded-top-4 py-4">
          <img
            src="https://i.pravatar.cc/120"
            alt="Profile"
            className="rounded-circle mb-3 border border-white"
            style={{ width: "100px", height: "100px" }}
          />
          <h4 className="mb-1">{user.name || "Client"}</h4>
          <small className="text-light text-capitalize">{user.role}</small>
        </div>

        <div className="card-body px-4 py-5">
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-semibold">Role:</span>
              <span className="text-capitalize">{user.role}</span>
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            <Link
              to="/orders"
              className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center gap-2"
            >
              <FaShoppingCart />
              {isAdmin ? "All Orders" : "My Orders"}
            </Link>

            <button
              className="btn btn-danger btn-lg d-flex align-items-center justify-content-center gap-2"
              onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
