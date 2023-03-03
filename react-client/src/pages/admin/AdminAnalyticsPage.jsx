import React from "react";
import AnalyticsPageComponent from "./components/AnalyticsPageComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";
const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateToCompare,
    {
      //To preven memory leakage
      signal: abctrl.signal,
    }
  );
  return data;
};

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare,
    {
      //To preven memory leakage
      signal: abctrl.signal,
    }
  );
  return data;
};
const AdminAnalyticsPage = () => {
  return (
    <AnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
