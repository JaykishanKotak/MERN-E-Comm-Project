const mongoose = require("mongoose");
const User = require("./UserModel");

const orderSchema = new mongoose.Schema(
  {
    // orderId: {
    //   type: Number,
    //   unique: true,
    //   default: 1,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    orderTotal: {
      itemsCount: { type: Number, required: true },
      cartSubtotal: { type: Number, required: true },
    },
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { path: { type: String, required: true } },
        quantity: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
    //Pay on Delivery / Paypal
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
//For Socket
//Will exicute when some chnages happens in order collection
Order.watch().on("change", (data) => {
  console.log(data);
  //If insert new order in db
  if (data.operationType === "insert") {
    //Emit when new order created
    io.emit("newOrder", data.fullDocument);
  }
});
module.exports = Order;
