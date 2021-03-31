const cacheAsyncError = require('../middlewares/cacheAsyncError.js');
const Order = require('../models/orderModel.js');
const Product = require('../models/productModel.js');
const ErrorHandler = require('../utils/errorHandler.js');

exports.newOrder = cacheAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
});

// get single order
exports.getSingleOrder = cacheAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({ success: true, order });
});

// get loged in user ourder
exports.myOrders = cacheAsyncError(async (req, res) => {
  const order = await Order.find({ user: req.user });

  res.status(200).json({ success: true, order });
});

// get all orders
exports.allOrders = cacheAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler('Order not found', 404));
  }

  const totalAmount = orders.reduce((a, c) => a + c.totalPrice, 0);

  res.status(200).json({ success: true, totalAmount, orders });
});

// update order
exports.updateOrder = cacheAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === 'delivered') {
    return next(new ErrorHandler('You have already delivered this order', 404));
  }

  order.orderItems.forEach(async (item) => {
    console.log({ item });
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ success: true });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
};

// delete order
exports.deleteOrder = cacheAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  await order.remove();
  res
    .status(200)
    .json({ success: true, message: 'Order deleted successfully' });
});
