import React from "react";
import OrdersPageComponent from "./components/OrdersPageComponent";
import axios from "axios";

const AdminOrdersPage = () => {
  const getOrders = async (abctrl) => {
    const { data } = await axios.get("/api/orders/admin", {
      signal: abctrl.signal,
    });
    return data;
  };

  return (
    <>
      <OrdersPageComponent getOrders={getOrders} />
    </>
  );
};

export default AdminOrdersPage;
