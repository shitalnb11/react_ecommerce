export default function AdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="p-3">
      <h3 className="mb-4">All Orders</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{o.userName}</td> {/* ✅ ONLY NAME */}
              <td>₹{o.total}</td>
              <td>
                <span className="badge bg-success">Placed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
