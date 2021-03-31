const dotenv = require('dotenv');
const connectDatabase = require('../config/database.js');
const Product = require('../models/productModel.js');
const products = require('../data/productsData.js');

dotenv.config({ path: 'backend/config/config.env' });

// database connection
connectDatabase();

const productSeeder = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
  } catch (error) {
    console.log({ error });
    console.log('something went wrong');
  }
};

productSeeder();
