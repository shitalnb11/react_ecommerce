import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

export default function UserOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const userOrders = orders.filter((o) => o.customerEmail === user?.email);

  if (!userOrders.length)
    return <h4 className="text-center mt-4">You have no orders yet</h4>;

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{o.customerName}</td>
              <td>{o.customerEmail}</td>
              <td>
                {o.items.map((item) => (
                  <div key={item.productId}>
                    {item.title} × {item.qty} = ₹{item.price * item.qty}
                  </div>
                ))}
              </td>
              <td>₹{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
