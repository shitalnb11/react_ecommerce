import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout() {
  const { addOrder } = useOrders();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    phone: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    const orderData = {
      customerName: user.name,
      phone: form.phone,
      address: form.address,
      products: cart.map((item) => ({
        title: item.title,
        quantity: item.qty,
      })),
      total,
    };

    addOrder(orderData, user.email); // 🔥 IMPORTANT FIX
    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4>Billing Details</h4>

            <input
              className="form-control mb-3"
              value={user?.name}
              disabled
            />

            <input
              className="form-control mb-3"
              value={user?.email}
              disabled
            />

            <input
              className="form-control mb-3"
              name="phone"
              placeholder="Phone"
              onChange={updateField}
            />

            <textarea
              className="form-control mb-3"
              name="address"
              placeholder="Address"
              onChange={updateField}
            />

            <button className="btn btn-success w-100" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4>Order Summary</h4>

            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <span>
                  {item.title} × {item.qty}
                </span>
                <strong>₹{item.price * item.qty}</strong>
              </div>
            ))}

            <hr />
            <h5>Total: ₹{total}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
