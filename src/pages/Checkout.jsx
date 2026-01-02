import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout() {
  const { cart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    // ✅ Dummy order success
    toast.success("Order placed successfully 🎉");

    clearCart();
    navigate("/orders");
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Checkout</h2>
        <div className="row">
          <div className="col-md-7">
            <Skeleton height={200} />
          </div>
          <div className="col-md-5">
            <Skeleton height={300} />
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty 🛒</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* ADDRESS */}
        <div className="col-md-7 mb-3">
          <div className="border rounded p-3 shadow-sm">
            <h4>Delivery Address</h4>

            <textarea
              className="form-control mt-2"
              rows="4"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <p className="text-muted mt-2">
              Logged in as <strong>{user?.name || user?.username}</strong>
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-md-5 mb-3">
          <div className="border rounded p-3 shadow-sm">
            <h4>Order Summary</h4>
            <hr />

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span>
                  {item.title} × {item.qty}
                </span>
                <div className="d-flex align-items-center gap-2">
                  <strong>₹{item.price * item.qty}</strong>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.qty - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <hr />

            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <strong>₹{total}</strong>
            </h5>

            {/* PLACE ORDER */}
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

            {/* PAYMENT PLACEHOLDER */}
            <button
              className="btn btn-outline-primary w-100 mt-2"
              disabled
              title="Razorpay / Stripe integration coming soon"
            >
              Pay with Card (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
