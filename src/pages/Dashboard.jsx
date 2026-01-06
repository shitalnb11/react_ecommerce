import { useRef, useState } from "react";
import { useProducts } from "../context/ProductContext";

const Dashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

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
      // ✅ Update Product via context
      updateProduct(editingProduct.id, {
        ...form,
        price: Number(form.price),
      });
    } else {
      // ✅ Add new product
      addProduct({
        ...form,
        price: Number(form.price),
      });
    }

    // Clear form
    setForm({ title: "", price: "", image: "", details: "" });
    setEditingProduct(null);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light overflow-hidden">
      {/* HEADER */}
      <header className="bg-dark text-white p-3">
        <h4 className="m-0">Admin Dashboard</h4>
      </header>

      {/* SCROLLABLE CONTENT */}
      <div ref={scrollRef} className="flex-grow-1 overflow-y-auto p-3 p-md-4">
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
                    setForm({ title: "", price: "", image: "", details: "" });
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
                    <p>₹{p.price}</p>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingProduct(p);
                        setForm({
                          title: p.title,
                          price: p.price,
                          image: p.image,
                          details: p.details,
                        });

                        // Scroll to top
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
