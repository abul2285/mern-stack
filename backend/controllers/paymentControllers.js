const cacheAsyncError = require('../middlewares/cacheAsyncError.js');
const stripe = require('stripe');
const dotenv = require('dotenv');

// configure environment variable
dotenv.config({ path: 'backend/config/config.env' });

const stripeApi = stripe(process.env.STRIPE_SECRET_KEY);

// stripe payment process => api/v1/payment/process
exports.processPayment = cacheAsyncError(async (req, res) => {
  const paymentIntent = await stripeApi.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// send stripe api key => api/v1/stripeapi
exports.sendStripeApiKey = cacheAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
