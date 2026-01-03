// Orders.jsx
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const { orders, deleteOrder, markDelivered } = useOrders();
  const { user } = useAuth();

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const visibleOrders = isAdmin
    ? orders
    : orders.filter((o) => {
        const orderEmail = o.userEmail || o.email || "";
        const userEmail = user.email || "";
        return orderEmail.toLowerCase() === userEmail.toLowerCase();
      });

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{isAdmin ? "All Orders" : "My Orders"}</h3>

      {visibleOrders.length === 0 && (
        <div className="alert alert-info">No orders found</div>
      )}

      {visibleOrders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                {isAdmin && <th>User</th>}
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {visibleOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>

                  {isAdmin && (
                    <td>
                      {order.userName || "N/A"}
                      <br />
                      <small className="text-muted">
                        {order.userEmail || order.email || "N/A"}
                      </small>
                    </td>
                  )}

                  <td>
                    {order.products?.map((p) => (
                      <div key={p.id || p.title}>
                        {p.title} × {p.quantity}
                      </div>
                    )) || "No products"}
                  </td>

                  <td className="fw-bold">₹{order.total || 0}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {isAdmin && (
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => markDelivered(order.id)}
                        disabled={order.status === "Delivered"}
                      >
                        Delivered
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
