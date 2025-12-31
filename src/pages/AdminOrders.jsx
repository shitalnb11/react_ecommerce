export default function AdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="p-3">
      <h3 className="mb-3">All Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {/* DESKTOP & TABLET VIEW */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
          <div className="d-md-none">
            {orders.map((order, index) => (
              <div className="order-card mb-3" key={index}>
                <div><strong>#</strong> {index + 1}</div>
                <div><strong>Customer:</strong> {order.customerName}</div>
                <div><strong>Product:</strong> {order.productName}</div>
                <div><strong>Qty:</strong> {order.quantity}</div>
                <div><strong>Total:</strong> ₹{order.totalPrice}</div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-success">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
