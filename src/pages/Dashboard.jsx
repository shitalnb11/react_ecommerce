import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  // PRODUCTS STATE (Load from localStorage)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // Save products in localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ id: null, title: "", price: "", description: "", image: "" });
  };

  const addProduct = () => {
    if (!form.title || !form.price || !form.description || !form.image) {
      alert("Fill all fields");
      return;
    }
    setProducts([...products, { ...form, id: Date.now() }]);
    resetForm();
  };

  const editProduct = (product) => setForm(product);

  const updateProduct = () => {
    setProducts(products.map((p) => (p.id === form.id ? form : p)));
    resetForm();
  };

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🛒 Admin</h2>
        <nav>
          <a className="active">Dashboard</a>
          <a>Products</a>
         
          <a>Profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h3>Welcome, {user.name}</h3>
          <span>{user.email}</span>
        </header>

        {/* Product Form */}
        <div className="section box mt-4">
          <h4>{form.id ? "Update Product" : "Add Product"}</h4>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />
            {form.id ? (
              <button type="button" className="btn-success" onClick={updateProduct}>
                Update
              </button>
            ) : (
              <button type="button" className="btn-success" onClick={addProduct}>
                Add
              </button>
            )}
          </form>
        </div>

        {/* Product List */}
        <div className="section box mt-4">
          <h4>Product List</h4>
          {products.length === 0 ? (
            <p>No products added.</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="product-item">
                <img src={p.image} alt="" />
                <div>
                  <h5>{p.title}</h5>
                  <p>₹{p.price}</p>
                  <p>{p.description}</p>
                </div>
                <div>
                  <button className="btn-warning" onClick={() => editProduct(p)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
