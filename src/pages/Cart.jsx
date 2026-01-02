import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.error("Item removed from cart");
  };

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    updateQuantity(id, qty);
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>🛒 Your cart is empty</h3>
        <p className="text-muted">Looks like you haven’t added anything yet</p>

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
      <h2 className="mb-4">Your Cart</h2>

      <div className="row">
        {/* CART ITEMS */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center border rounded p-3 mb-3 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div className="ms-3 flex-grow-1">
                <h5>{item.title}</h5>
                <p className="mb-1 text-muted">₹{item.price}</p>

                {/* Quantity */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      handleQtyChange(item.id, item.qty - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      handleQtyChange(item.id, item.qty + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="col-md-4">
          <div className="border rounded p-3 shadow-sm">
            <h4>Order Summary</h4>
            <hr />

            <p className="d-flex justify-content-between">
              <span>Total Items</span>
              <strong>{cart.length}</strong>
            </p>

            <p className="d-flex justify-content-between">
              <span>Total Amount</span>
              <strong>₹{total}</strong>
            </p>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => {
                toast.success("Proceeding to checkout");
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
