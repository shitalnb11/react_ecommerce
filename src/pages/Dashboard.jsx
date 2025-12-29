import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUser, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const { addProduct, deleteProduct, products } = useProducts();
  const { addToCart } = useCart();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    details: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm({ title: "", price: "", image: "", details: "" });
  };

  return (
    <div className="d-flex vh-100 bg-light">

      {/* Sidebar */}
      <aside className="bg-white text-dark p-3" style={{ width: "220px" }}>
        <h3 className="text-center mb-4">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-dark d-flex align-items-center">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/product-list" className="nav-link text-dark d-flex align-items-center">
              <FaBox className="me-2" /> Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/orders" className="nav-link text-dark d-flex align-items-center">
              <FaShoppingCart className="me-2" /> Orders
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/profile" className="nav-link text-dark d-flex align-items-center">
              <FaUser className="me-2" /> Users
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 overflow-auto">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dashboard</h2>
          {/* <div>Welcome, Admin</div> */}
        </div>

        {/* Add Product Form */}
        <div className="card shadow-sm mb-5 p-4">
          <h4 className="mb-3">Add New Product</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Product Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="details"
                  className="form-control"
                  placeholder="Short Details"
                  value={form.details}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn btn-primary mt-3 px-4 py-2">Add Product</button>
          </form>
        </div>

        {/* Product Cards */}
        <div className="row">
          {products.length === 0 && <p>No products added yet</p>}

          {products.map((p) => (
            <div className="col-md-6 col-lg-4 mb-4" key={p.id}>
              <div className="card shadow-sm h-100 border-0 rounded-3 overflow-hidden">
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "200px", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="text-success fw-bold">₹{p.price}</p>
                  <p className="text-muted small">{p.details}</p>
                  <div className="mt-auto d-flex flex-column gap-2">
                    {/* <button
                      className="btn btn-warning w-100"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button> */}
                    <Link
                      to={`/productDetails/${p.id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      View Details
                    </Link>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
