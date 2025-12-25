import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} className="cart-img" />

                <div className="info">
                  <h4>{item.title}</h4>
                  <p>₹{item.price}</p>
                </div>

                {/* Quantity Update */}
                <div className="qty-control">
                  <button onClick={() => updateQuantity(item.id, item.qty - 1)}>
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button onClick={() => updateQuantity(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>

            <Link to="/checkout">
              <button className="btn">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
