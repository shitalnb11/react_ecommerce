import { useOrders } from "../context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const { orders, deleteOrder, markDelivered } = useOrders();

  return (
    <div className="d-flex min-vh-100 bg-light">
      <main className="flex-grow-1 p-4">

        <h3 className="mb-4">All Orders</h3>

        {orders.length === 0 && <p>No orders yet</p>}

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  {/* ✅ FIXED */}
                  <td>{order.userName}</td>

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

                  <td>{order.date}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => markDelivered(index)}
                      disabled={order.status === "Delivered"}
                    >
                      Delivered
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteOrder(index)}
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
