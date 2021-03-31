const cacheAsyncError = require('../middlewares/cacheAsyncError.js');
const User = require('../models/userModel.js');
const ErrorHandler = require('../utils/errorHandler.js');
const sendToken = require('../utils/sendToken.js');
const cloudinary = require('cloudinary');
// register a new user
exports.registerUser = cacheAsyncError(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// login user
exports.loginUser = cacheAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter Email & Password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler('Password is not match', 400));
  }

  sendToken(user, 200, res);
});

exports.logoutUser = cacheAsyncError(async (req, res, next) => {
  res
    .cookie('token', null, { expires: new Date(Date.now()), httponly: true })
    .json({ success: true, message: 'loged out successfully' });
});

// get user details
exports.getUserProfile = cacheAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  res.status(200).json({ success: true, user });
});

exports.updatePassword = cacheAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const isPasswordMatch = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler('Old password is not match', 400));
  }

  user.password = req.body.password;

  await user.save();

  sendToken(user, 200, res);
});

// update profile
exports.updateProfile = cacheAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const newUser = {
    name,
    email,
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user._id);
    const img_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(img_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUser.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

// admin controllers

// get all users by admin
exports.getAllUsers = cacheAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

// get user details by admin
exports.getUserDetails = cacheAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, user });
});

// update user by admin
exports.updateUser = cacheAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

// delete user by admin
exports.deleteUser = cacheAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  user.remove();

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});
