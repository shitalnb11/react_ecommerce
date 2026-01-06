import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  /* ================= CUSTOMER INFO ================= */
  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  /* ================= ADDRESS ================= */
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("Home");

  /* ================= EXTRAS ================= */
  const [couponCode, setCouponCode] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Anytime");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = () => {
    if (cart.length === 0) return toast.error("Your cart is empty!");
    if (!customer.name || !customer.email || !customer.phone)
      return toast.error("Fill customer details!");
    if (!address.line1 || !address.city || !address.state || !address.postalCode || !address.country)
      return toast.error("Fill full address!");
    if (!agreeTerms) return toast.error("Accept Terms & Conditions");

    const items = cart.map((item) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.qty,
      subtotal: item.price * item.qty,
    }));

    const itemsTotal = items.reduce((sum, i) => sum + i.subtotal, 0);
    const tax = +(itemsTotal * 0.18).toFixed(2);
    const shippingCost = 50;
    const discount = 0;
    const grandTotal = +(itemsTotal + tax + shippingCost - discount).toFixed(2);

    const order = {
      orderId: "ORD" + Date.now(),
      customer,
      shippingAddress: {
        ...address,
        landmark,
        addressType,
      },
      delivery: {
        slot: deliverySlot,
        expectedDate: new Date(Date.now() + 5 * 86400000).toDateString(),
      },
      items,
      pricing: {
        itemsTotal,
        tax,
        shippingCost,
        discount,
        grandTotal,
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === "COD" ? "Pending" : "Paid",
      },
      couponCode,
      customerNotes,
      orderStatus: "Processing",
      createdAt: new Date().toISOString(),
    };

    addOrder(order, customer.email, customer.name);

    toast.success("Order placed successfully 🎉");
    clearCart();
    navigate("/orders");
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="container mt-4">
        <Skeleton height={300} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT */}
        <div className="col-md-7">
          <div className="border rounded p-3 shadow-sm">

            <h4>Customer Info</h4>
            <input className="form-control mb-2" placeholder="Full Name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />

            <h4 className="mt-3">Shipping Address</h4>
            <input className="form-control mb-2" placeholder="Address Line 1"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Address Line 2"
              value={address.line2}
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <input className="form-control mb-2" placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="State"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
            <input className="form-control mb-2" placeholder="Country"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />

            <select className="form-select mb-2"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
            >
              <option>Home</option>
              <option>Office</option>
            </select>

            <select className="form-select mb-2"
              value={deliverySlot}
              onChange={(e) => setDeliverySlot(e.target.value)}
            >
              <option>Anytime</option>
              <option>Morning</option>
              <option>Evening</option>
            </select>

            <textarea className="form-control mb-2" placeholder="Delivery Notes"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
            />

            <div className="form-check">
              <input className="form-check-input" type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label className="form-check-label">
                I agree to Terms & Conditions
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-5">
          <div className="border rounded p-3 shadow-sm">
            <h4>Order Summary</h4>
            {cart.map((i) => (
              <div key={i.id} className="d-flex justify-content-between">
                <span>{i.title} × {i.qty}</span>
                <strong>₹{i.price * i.qty}</strong>
              </div>
            ))}
            <hr />
            <h5>Total: ₹{total}</h5>

            <select className="form-select mt-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Card / UPI</option>
            </select>

            <button className="btn btn-success w-100 mt-3" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
