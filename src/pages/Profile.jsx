import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUser, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="d-flex min-vh-100 bg-light">

     
      {/* 🔹 PROFILE CONTENT */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-start p-5">

        <div className="profile-card bg-white p-4 rounded-4 shadow" style={{ width: "420px" }}>
          
          {/* Profile Header */}
          <div className="text-center mb-4">
            <img
              src="https://i.pravatar.cc/120"
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px" }}
            />
            <h4 className="mb-0">{user.name || "Client"}</h4>
            <small className="text-muted">{user.role}</small>
          </div>

          {/* Profile Details */}
          <div className="mb-3">
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/orders" className="btn btn-outline-primary">
              My Orders
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
