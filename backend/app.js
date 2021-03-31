const express = require('express');
const path = require('path');
const productRouter = require('./routes/productRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const userRouter = require('./routes/userRoutes.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const orderRouter = require('./routes/orderRoutes.js');
const fileUpload = require('express-fileupload');
const paymentRouter = require('./routes/paymentRoutes.js');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

app.use('/api/v1/', productRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', paymentRouter);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../forntend/build/index.html'));
  });
}

app.use(errorMiddleware);

module.exports = app;
