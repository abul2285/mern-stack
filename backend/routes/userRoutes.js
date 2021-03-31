const express = require('express');
const {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers.js');
const { isAuth, authorizeRoles } = require('../middlewares/isAuth.js');

const { forgotPassword, resetPassword } = require('../middlewares/isAuth.js');

const userRouter = express.Router();

// authentication routes
userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/password/reset/:token').put(resetPassword);
userRouter.route('/logout').get(logoutUser);

// user profile route
userRouter.route('/me').get(isAuth, getUserProfile);
userRouter.route('/me/update').put(isAuth, updateProfile);
userRouter.route('/password/update').put(isAuth, updatePassword);

// admin routes
userRouter
  .route('/admin/users')
  .get(isAuth, authorizeRoles('admin'), getAllUsers);
userRouter
  .route('/admin/user/:id')
  .get(isAuth, authorizeRoles('admin'), getUserDetails)
  .put(isAuth, authorizeRoles('admin'), updateUser)
  .delete(isAuth, authorizeRoles('admin'), deleteUser);

module.exports = userRouter;
