const ErrorHandler = require('../utils/errorHandler.js');

function errorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    let message;

    if (err.name === 'CastError') {
      message = `Resource not found. Invalid ${err.path}`;
    }

    if (err.name === 'ValidationError') {
      message = Object.values(err.errors).map((error) => error.message);
    }

    if (err.code === 11000) {
      message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }

    if (err.name === 'JsonWebtokenError') {
      message = 'Json Web Token is invalid. Try again!!';
    }

    if (err.name === 'TokenExpiredError') {
      message = 'Json Web Token is expired. Try again!!';
    }
    if (message) {
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}

module.exports = errorMiddleware;
