import { useOrders } from "../context/OrderContext";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUser, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const { orders, deleteOrder, markDelivered } = useOrders();

  return (
    <div className="d-flex min-vh-100 bg-light">

      
      {/* 🔹 MAIN CONTENT */}
      <main className="flex-grow-1 p-4">

        <h3 className="mb-4">All Orders</h3>

        {orders.length === 0 && <p>No orders yet</p>}

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>

                  <td>
                    {order.products.map((p, i) => (
                      <div key={i}>
                        {p.title} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="fw-bold">₹{order.total}</td>

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

                  <td>{new Date(order.date).toLocaleDateString()}</td>

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

      </main>
    </div>
  );
}
