const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'please enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxlength: [5, 'product price cannot exceed 5 characters'],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, 'please enter product category'],
    enum: {
      values: [
        'Electronics',
        'Camaras',
        'Laptop',
        'Accessories',
        'Headphone',
        'Foods',
        'Books',
        'Beauty/Health',
        'Clothes/Shoes',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select currect product category',
    },
  },
  seller: { type: String, required: true },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxlength: [5, 'Product stock cannot exceed 5 characters'],
    default: 0,
  },
  numOfReviews: { type: Number },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
