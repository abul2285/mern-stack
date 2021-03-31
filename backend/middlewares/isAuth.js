const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');
const cacheAsyncError = require('./cacheAsyncError.js');
const ErrorHandler = require('../utils/errorHandler.js');
const sendMail = require('../utils/sendMail.js');
const crypto = require('crypto');
const sendToken = require('../utils/sendToken.js');

exports.isAuth = cacheAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode.id);

  next();
});

exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorHandler(
        `Role (${req.user.role}) is not allowed to access this resource`,
        403
      )
    );
  }
  next();
};

// reset password token
exports.forgotPassword = cacheAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nif you have not requested this email, then ignore it.`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Recover forgot Password',
      message,
    });

    res
      .status(200)
      .json({ success: true, message: `Email send to : ${user.email}` });
  } catch (error) {
    user.resetPasswordtoken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(error.message, 500));
  }
});

// reset password after making forgot password
exports.resetPassword = cacheAsyncError(async (req, res, next) => {
  const resetPasswordtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordtoken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
