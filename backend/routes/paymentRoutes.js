const express = require('express');
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentControllers.js');
const { isAuth } = require('../middlewares/isAuth.js');

const paymentRouter = express.Router();

paymentRouter.route('/payment/process').post(isAuth, processPayment);
paymentRouter.route('/stripeapi').get(isAuth, sendStripeApiKey);

module.exports = paymentRouter;
