import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // handle input change
  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // form submit
  const placeOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    alert(
      `Order Placed Successfully!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}\n\nTotal: ₹${total}`
    );

    clearCart();
  };

  return (
    <div className="checkout-container" style={{ padding: "40px" }}>
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">

        {/* LEFT SIDE FORM */}
        <div className="col-md-6">
          <h4>Billing Details</h4>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group mt-3">
            <label>Address</label>
            <textarea
              className="form-control"
              name="address"
              value={form.address}
              onChange={updateField}
              placeholder="Enter your full address"
            ></textarea>
          </div>

          <button
            className="btn btn-success mt-4 px-4"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="col-md-6">
          <h4>Order Summary</h4>

          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="summary-box mt-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p className="m-0">Qty: {item.qty}</p>
                  </div>

                  <p className="m-0">₹{item.price * item.qty}</p>
                </div>
              ))}

              <hr />
              <h5>Total: ₹{total}</h5>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
