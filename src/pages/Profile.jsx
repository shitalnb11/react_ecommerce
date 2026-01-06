import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

export default function UserOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  // ✅ correct filter
  const userOrders = orders.filter(
    (o) => o.customer?.email === user?.email
  );

  if (!userOrders.length) {
    return (
      <h4 className="text-center mt-4">
        You have no orders yet
      </h4>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Orders</h3>

      {userOrders.map((o, index) => (
        <div key={o.orderId} className="card mb-3 shadow-sm">
          <div className="card-header d-flex justify-content-between">
            <strong>Order #{index + 1}</strong>
            <span className="badge bg-info">{o.orderStatus}</span>
          </div>

          <div className="card-body">
            <p><strong>Name:</strong> {o.customer.name}</p>
            <p><strong>Email:</strong> {o.customer.email}</p>
            <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>

            <hr />

            <strong>Items:</strong>
            {o.items.map((item) => (
              <div key={item.productId}>
                {item.title} × {item.quantity} = ₹{item.subtotal}
              </div>
            ))}

            <hr />
            <h5>Total: ₹{o.pricing.grandTotal}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
