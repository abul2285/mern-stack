const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderControllers.js');
const { isAuth, authorizeRoles } = require('../middlewares/isAuth.js');

const orderRouter = express.Router();

orderRouter.route('/order/new').post(isAuth, newOrder);
orderRouter.route('/order/:id').get(isAuth, getSingleOrder);
orderRouter.route('/orders/me').get(isAuth, myOrders);
orderRouter
  .route('/admin/orders')
  .get(isAuth, authorizeRoles('admin'), allOrders);
orderRouter
  .route('/admin/order/:id')
  .put(isAuth, authorizeRoles('admin'), updateOrder);
orderRouter
  .route('/admin/order/:id')
  .delete(isAuth, authorizeRoles('admin'), deleteOrder);

module.exports = orderRouter;
