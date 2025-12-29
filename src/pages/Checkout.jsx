import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout() {
  const { addOrder } = useOrders();
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    const newOrder = {
      id: "ORD" + Date.now(),
      customerName: form.name,
      products: cart.map((item) => ({ title: item.title, quantity: item.qty })),
      total,
      status: "Processing",
      date: new Date().toISOString(),
    };

    addOrder(newOrder);
    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Checkout</h2>
      <div className="row gx-4 gy-4">

        {/* LEFT: Billing Form */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4 border-0">
            <h4 className="mb-4">Billing Details</h4>

            {["name", "email", "phone"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "number" : "text"}
                  className="form-control"
                  name={field}
                  value={form[field]}
                  onChange={updateField}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={form.address}
                onChange={updateField}
                placeholder="Enter your full address"
                rows={3}
              />
            </div>

            <button className="btn btn-success w-100 mt-3" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4 border-0">
            <h4 className="mb-4">Order Summary</h4>

            {cart.length === 0 ? (
              <p className="text-muted">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between mb-3 p-2 border rounded hover-shadow"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <div>
                        <h6 className="mb-1">{item.title}</h6>
                        <small className="text-muted">₹{item.price}</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <strong>₹{item.price * item.qty}</strong>
                  </div>
                ))}

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <h5>Total</h5>
                  <h5>₹{total}</h5>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
