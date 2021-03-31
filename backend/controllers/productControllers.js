const Product = require('../models/productModel.js');
const ErrorHandler = require('../utils/errorHandler.js');
const cacheAsyncError = require('../middlewares/cacheAsyncError.js');
const APIFeature = require('../utils/apiFeatures.js');
const cloudinary = require('cloudinary');

// get all products
exports.getAllProducts = cacheAsyncError(async (req, res) => {
  const productPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new APIFeature(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  const filteredProductsCount = products.length;
  apiFeature.pagination(productPerPage);
  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    productPerPage,
    filteredProductsCount,
    products,
  });
});

// get admin products
exports.getAdminProducts = cacheAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// get single product
exports.getSingleProduct = cacheAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({ sucess: true, product });
});

// create new product
exports.newProduct = cacheAsyncError(async (req, res) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  product.save();
  res.status(201).json({ success: true, product });
});

// update a product
exports.updateProduct = cacheAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

// delete product
exports.deleteProduct = cacheAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.remove();

  res.status(200).json({ success: true, message: 'Product is deleted' });
});

// create product review
exports.createProductReview = cacheAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find((r) => {
    return r.user._id.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user._id.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.rating =
    product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

// get all reviews of a specific product
exports.getProductReviews = cacheAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({ sucess: true, reviews: product.reviews });
});

exports.getAllProductsReviews = cacheAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    sucess: true,
    allReviews: products.map((product) => ({
      reviews: product.reviews,
      productId: product._id,
    })),
  });
});

// delete review from a specific product
exports.deleteProductReview = cacheAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id
  );

  const numOfReviews = reviews.length;
  let rating;
  if (reviews.length <= 0) {
    rating = 0;
  } else {
    rating = reviews.reduce((a, c) => a + c.rating, 0) / reviews.length;
  }

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, rating },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res
    .status(200)
    .json({ success: true, message: 'Review deleted successfully' });
});
