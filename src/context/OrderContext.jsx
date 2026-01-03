import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Add Order
  const addOrder = (order, userEmail, userName) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      userEmail,
      userName,
      status: "Pending",
      date: new Date().toISOString(),
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Delete Order
  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((o) => o.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Mark Delivered
  const markDelivered = (id) => {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: "Delivered" } : o
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, deleteOrder, markDelivered }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
