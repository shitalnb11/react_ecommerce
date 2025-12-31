import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { FaBox, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const { addProduct, deleteProduct, products } = useProducts();
  const { user, logout } = useAuth();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    details: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm({ title: "", price: "", image: "", details: "" });
  };

  return (
    <div className="d-flex flex-column bg-light vh-100 overflow-hidden">

      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-3 shadow-sm">
        <h4 className="m-0 fs-5">Admin Dashboard</h4>
        <div className="d-flex align-items-center gap-2">
          <span className="d-none d-sm-inline">Welcome, {user?.name}</span>
          {/* <button
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button> */}
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-grow-1 overflow-y-auto p-3 p-md-4">

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-start border-4 border-primary p-3 text-center h-100">
              <FaBox size={30} className="text-primary mb-2" />
              <h6>Total Products</h6>
              <h3 className="fw-bold">{products.length}</h3>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-start border-4 border-warning p-3 text-center h-100">
              <FaShoppingCart size={30} className="text-warning mb-2" />
              <h6>Total Orders</h6>
              <h3 className="fw-bold">{orders.length}</h3>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-start border-4 border-success p-3 text-center h-100">
              <FaUsers size={30} className="text-success mb-2" />
              <h6>Total Users</h6>
              <h3 className="fw-bold">{users.length}</h3>
            </div>
          </div>
        </div>

        {/* Add Product */}
        <div className="card shadow-sm mb-4">
          <div className="card-header fw-semibold bg-white">
            Add New Product
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
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

                <div className="col-12 col-md-6">
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

                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
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

              <button className="btn btn-primary mt-3 px-4">
                Add Product
              </button>
            </form>
          </div>
        </div>

        {/* Product List */}
        <h5 className="mb-3 fw-semibold">Products List</h5>
        <div className="row g-3">
          {products.length === 0 && (
            <p className="text-center">No products added yet</p>
          )}

          {products.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-semibold">{p.title}</h6>
                  <p className="text-success fw-bold">₹{p.price}</p>
                  <p className="small text-muted flex-grow-1">
                    {p.details}
                  </p>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
