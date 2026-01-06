import { useRef, useState } from "react";
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";

const Dashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Orders & Users from localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const scrollRef = useRef(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    details: "",
  });

  // 🔹 Add / Update Product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...form,
        price: Number(form.price),
      });
    } else {
      addProduct({
        ...form,
        price: Number(form.price),
      });
    }

    setForm({ title: "", price: "", image: "", details: "" });
    setEditingProduct(null);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light overflow-hidden">
      {/* HEADER */}
      <header className="bg-primary text-white p-3">
        <h4 className="m-0">Admin Dashboard</h4>
      </header>

      {/* SCROLLABLE CONTENT */}
      <div ref={scrollRef} className="flex-grow-1 overflow-auto p-3 p-md-4">

        {/* STATS CARDS */}
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

        {/* FORM */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editingProduct ? "Edit Product" : "Add Product"}</h5>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Details"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />

              <button className="btn btn-success">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

              {editingProduct && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingProduct(null);
                    setForm({
                      title: "",
                      price: "",
                      image: "",
                      details: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="row">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <img
                    src={p.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={p.title}
                    style={{ height: 200, objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h6>{p.title}</h6>
                    <p className="fw-bold">₹{p.price}</p>
                    <p className="small text-muted">{p.details}</p>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingProduct(p);
                        setForm({
                          title: p.title,
                          price: String(p.price),
                          image: p.image,
                          details: p.details,
                        });

                        scrollRef.current?.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
