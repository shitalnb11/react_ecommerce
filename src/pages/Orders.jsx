import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

export default function UserOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  if (!orders || orders.length === 0) {
    return <h4 className="text-center mt-4">No orders found</h4>;
  }

  // ✅ only logged-in user's orders
  const userOrders = orders.filter(
    (o) =>
      o.userEmail === user?.email ||
      o.customer?.email === user?.email
  );

  if (!userOrders.length) {
    return <h4 className="text-center mt-4">You have no orders yet</h4>;
  }

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-3">My Orders</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Products</th>
              <th>Shipping Address</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {userOrders.map((o, index) => (
              <tr key={o.id}>
                <td className="text-center">{index + 1}</td>

                <td>
                  <strong>{o.id}</strong>
                  <br />
                  <small>{o.userEmail}</small>
                </td>

                {/* PRODUCTS */}
                <td>
                  {(o.products || o.items).map((item, i) => (
                    <div key={i}>
                      {item.title} ×{" "}
                      {item.quantity || item.qty}
                      <br />
                      <small className="text-muted">
                        ₹{item.price}
                      </small>
                    </div>
                  ))}
                </td>

                {/* ADDRESS */}
                <td>
                  {o.address && <div>{o.address}</div>}

                  {o.shippingAddress && (
                    <>
                      <div>{o.shippingAddress.line1}</div>
                      <div>{o.shippingAddress.line2}</div>
                      <div>
                        {o.shippingAddress.city},{" "}
                        {o.shippingAddress.state}
                      </div>
                      <div>{o.shippingAddress.postalCode}</div>
                    </>
                  )}
                </td>

                {/* PAYMENT */}
                <td className="text-center">
                  {o.payment?.method || "COD"}
                  <br />
                  <small className="text-muted">
                    {o.payment?.status || "Pending"}
                  </small>
                </td>

                {/* TOTAL */}
                <td className="text-center">
                  ₹{o.total || o.pricing?.grandTotal}
                </td>

                {/* STATUS */}
                <td className="text-center">
                  <span
                    className={`badge ${
                      (o.status || o.orderStatus) === "Delivered"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {o.status || o.orderStatus}
                  </span>
                </td>

                {/* DATE */}
                <td className="text-center">
                  {new Date(o.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
