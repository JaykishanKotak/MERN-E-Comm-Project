import React from "react";
import axios from "axios";
import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id);
  return data;
};

//For Delivered Button
const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/orders/delivered/" + id);
  if (data) {
    return data;
  }
};

const AdminOrderDetailsPage = () => {
  return (
    <>
      <OrderDetailsPageComponent
        getOrder={getOrder}
        markAsDelivered={markAsDelivered}
      />
    </>
  );
};

export default AdminOrderDetailsPage;
