import { useOrders } from "../context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrders() {
  const { orders, deleteOrder, markDelivered } = useOrders();

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">All Orders</h3>

      {orders.length === 0 && (
        <div className="alert alert-info">
          No orders available
        </div>
      )}

      {orders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>

                  {/* CUSTOMER */}
                  <td>
                    <strong>{order.userName}</strong>
                    <br />
                    <small className="text-muted">
                      {order.userEmail}
                    </small>
                  </td>

                  {/* PRODUCTS */}
                  <td>
                    {order.products.map((p, i) => (
                      <div key={i}>{p.title}</div>
                    ))}
                  </td>

                  {/* QUANTITY */}
                  <td>
                    {order.products.map((p, i) => (
                      <div key={i}>{p.quantity}</div>
                    ))}
                  </td>

                  {/* TOTAL */}
                  <td className="fw-bold">
                    ₹{order.total}
                  </td>

                  {/* STATUS */}
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

                  {/* ACTION */}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
