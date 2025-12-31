import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaCheck } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const { orders, deleteOrder, markDelivered } = useOrders();
  const { user } = useAuth();

  const userOrders =
    user?.role === "admin"
      ? orders
      : orders.filter(
          (o) =>
            o.userEmail?.toLowerCase() ===
            user?.email?.toLowerCase()
        );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {user?.role === "admin" ? "All Orders" : "My Orders"}
      </h2>

      {userOrders.length === 0 ? (
        <div className="alert alert-info text-center">
          No orders found
        </div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {userOrders.map((order, i) => (
              <tr key={order.id}>
                <td>{i + 1}</td>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.userEmail}</td>

                <td>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.title} × {p.quantity}
                    </div>
                  ))}
                </td>

                <td>₹{order.total}</td>

                <td>
                  <span
                    className={`badge ${
                      order.status === "Delivered"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="d-flex gap-2">
                  {user?.role === "admin" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => markDelivered(order.id)}
                      disabled={order.status === "Delivered"}
                    >
                      <FaCheck />
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
