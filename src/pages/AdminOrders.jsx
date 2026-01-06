import React from "react";
import { useOrders } from "../context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrders() {
  const { orders } = useOrders();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "Processing":
        return <span className="badge bg-primary">{status}</span>;
      case "Delivered":
        return <span className="badge bg-success">{status}</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getPaymentBadge = (payment) => {
    if (!payment) return <span className="badge bg-secondary">COD</span>;
    return payment.status === "Paid" ? (
      <span className="badge bg-success">{payment.method} - Paid</span>
    ) : (
      <span className="badge bg-warning text-dark">{payment.method} - Pending</span>
    );
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No orders yet 🛒</h3>
        <p className="text-muted">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Admin Orders Dashboard</h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark sticky-top">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer?.name || order.userName || "N/A"}</td>
                <td>{order.customer?.email || order.userEmail || "N/A"}</td>
                <td>
                  {(order.items || []).map((item) => (
                    <div
                      key={item.productId}
                      className="p-1 mb-1 border rounded bg-light"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {item.title} × {item.quantity} <strong>₹{item.subtotal}</strong>
                    </div>
                  ))}
                </td>
                <td>
                  ₹{order.pricing?.grandTotal ||
                    (order.items || []).reduce((sum, i) => sum + i.subtotal, 0)}
                </td>
                <td>{getStatusBadge(order.orderStatus || order.status || "Pending")}</td>
                <td>{getPaymentBadge(order.payment)}</td>
                <td>{new Date(order.date || order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
