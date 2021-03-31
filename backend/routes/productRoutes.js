const express = require('express');
const {
  getAllProducts,
  getSingleProduct,
  newProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  getAdminProducts,
  deleteProductReview,
  getAllProductsReviews,
} = require('../controllers/productControllers.js');
const { isAuth, authorizeRoles } = require('../middlewares/isAuth.js');

const productRouter = express.Router();

productRouter.route('/products').get(getAllProducts);
productRouter.route('/admin/products').get(getAdminProducts);
productRouter.route('/product/:id').get(getSingleProduct);
productRouter
  .route('/admin/product/new')
  .post(isAuth, authorizeRoles('admin'), newProduct);
productRouter
  .route('/admin/product/:id')
  .put(isAuth, authorizeRoles('admin'), updateProduct)
  .delete(isAuth, authorizeRoles('admin'), deleteProduct);
productRouter
  .route('/admin/reviews')
  .get(isAuth, authorizeRoles('admin'), getAllProductsReviews);
productRouter.route('/review').put(isAuth, createProductReview);
productRouter
  .route('/admin/review/delete')
  .get(isAuth, getProductReviews)
  .delete(isAuth, deleteProductReview);

module.exports = productRouter;
