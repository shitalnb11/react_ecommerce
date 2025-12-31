import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loggedInUser = login(email, password);

    if (!loggedInUser) {
      alert("Invalid credentials!");
      return;
    }

    alert("Login successful!");

    // ✅ ROLE BASED REDIRECT
    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/products"); // ✅ CLIENT → PRODUCTS
    }
  };

  return (
    <div className="container p-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>

      <input
        className="form-control mt-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mt-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-success mt-3 w-100" onClick={handleLogin}>
        Login
      </button>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
