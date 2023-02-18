import React from "react";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

//Get order details
const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const loadPaypalScripts = (
  cartSubtotal,
  cartItems,
  orderId,
  updateStateAfterOrder
) => {
  loadScript({ "client-id": "test id " })
    .then((paypal) => {
      //Dynamically Load Paypal Buttons
      paypal
        // .Buttons({
        //   //createOrder: createPayPalOrderHandler,
        //   //onCancel: onCancelHandler,
        //   //onApprove: onApproveHandler,
        //   //onError: onErrorHandler,
        // })
        .Buttons(buttons(cartSubtotal, cartItems))
        .render("#paypal-container-element");
      console.log(paypal);
    })
    .catch((err) => {
      console.log("Failed to load Paypal JS SDK Scripts", err);
    });
};

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    //Called when paypal finishes payment process
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          //console.log("update order in database");
          updateOrder(orderId)
            .then((data) => {
              if (data.isPaid) {
                updateStateAfterOrder(data.paidAt);
              }
            })
            .catch((er) => console.log(er));
        }
      });
    },
    onError: onErrorHandler,
  };
};
// const createPayPalOrderHandler = function () {
//   console.log("createPayPalOrderHandler");
// };

const onCancelHandler = function () {
  console.log("cancel");
};

// const onApproveHandler = function () {
//   console.log("onApproveHandler");
// };

const onErrorHandler = function (err) {
  console.log("error");
};

//Upadte oderd after payment
const updateOrder = async (orderId) => {
  const { data } = await axios.put("/api/orders/paid/" + orderId);
  return data;
};
const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };
  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      //loadScript={loadScript}
      loadPaypalScripts={loadPaypalScripts}
    />
  );
};

export default UserOrderDetailsPage;
