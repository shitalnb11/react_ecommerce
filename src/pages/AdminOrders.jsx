import React from "react";
import { useOrders } from "../context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrders() {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No orders yet 🛒</h3>
      </div>
    );
  }

  const statusBadge = (status) => {
    const map = {
      Pending: "bg-warning text-dark",
      Processing: "bg-primary",
      Delivered: "bg-success",
      Cancelled: "bg-danger",
    };
    return <span className={`badge ${map[status] || "bg-secondary"}`}>{status}</span>;
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-3 text-primary">Admin Orders Dashboard</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Shipping Address</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, index) => (
              <tr key={o.id}>
                <td className="text-center">{index + 1}</td>

                <td>
                  <strong>{o.id}</strong>
                  <br />
                  <small>{o.userEmail}</small>
                </td>

                <td>
                  {o.customer?.name || o.userName}
                  <br />
                  <small className="text-muted">
                    {o.customer?.email || o.userEmail}
                  </small>
                </td>

                {/* PRODUCTS */}
                <td>
                  {(o.products || o.items || []).map((item, i) => (
                    <div key={i} className="border rounded p-1 mb-1 bg-light">
                      {item.title} × {item.quantity || item.qty}
                      <br />
                      <small>₹{item.price}</small>
                    </div>
                  ))}
                </td>

                {/* ADDRESS */}
                <td style={{ fontSize: "0.9rem" }}>
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
                  {statusBadge(o.orderStatus || o.status || "Pending")}
                </td>

                {/* DATE */}
                <td className="text-center">
                  {new Date(o.date || o.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
