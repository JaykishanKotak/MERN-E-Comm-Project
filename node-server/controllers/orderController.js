const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

// const getOrders = (req, res) => {
//   try {
//     res.send("Handling order routes, e.g. get orders");
//   } catch (error) {
//     console.log(error);
//   }
// };

const getUserOrders = async (req, res, next) => {
  try {
    //Find User order by the User ID
    const orders = await Order.find({ user: ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!cartItems || !orderTotal || !paymentMethod) {
      return res.status(400).send("All inputs are required !");
    }

    //Push id numbers for each individiual items / Collection of ids of product id
    // use to update the number of sales
    let ids = cartItems.map((item) => {
      return item.productID;
    });

    //Return quantity of product added to shooping cart
    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });

    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      });
    });

    //Create a order
    const order = new Order({
      user: ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });

    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (error) {
    next(error);
  }
};
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    //set current date when user paid the amount
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    //set current date when admin delievered the order
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    res.send(deliveredOrder);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" });

    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    //Fetching data from start of start date
    start.setHours(0, 0, 0, 0);
    //EX : Mon Dec 12 2022 00:00:00 GMT+0530 (India Standard Time)
    const end = new Date(req.params.date);
    //Fetching data from end of end date
    end.setHours(23, 59, 59, 999);
    //EX : Mon Dec 12 2022 23:59:59 GMT+0530 (India Standard Time)

    //Data for Date between >= start and <= end date
    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });

    res.send(order);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
