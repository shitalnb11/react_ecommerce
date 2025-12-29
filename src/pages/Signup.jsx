import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    signup(form);
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="container p-5" style={{ maxWidth: "450px" }}>
      <h2>Signup</h2>

      <input
  className="form-control mt-2"
  placeholder="Enter your full name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
  className="form-control mt-2"
  type="email"
  placeholder="Enter your email address"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>

<input
  className="form-control mt-2"
  type="password"
  placeholder="Create a password"
  value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
/>

<input
  className="form-control mt-2"
  placeholder="Enter your address"
  value={form.address}
  onChange={(e) => setForm({ ...form, address: e.target.value })}
/>

      <button className="btn btn-primary mt-3 w-100" onClick={handleSubmit}>
        Signup
      </button>
    </div>
  );
}
