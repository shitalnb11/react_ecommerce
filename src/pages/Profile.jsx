import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Profile</h2>

      <div className="card p-4 shadow-sm">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <button onClick={logout} className="btn btn-danger mt-3">
          Logout
        </button>
      </div>
    </div>
  );
}
