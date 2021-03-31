const casual = require('casual');

casual.define('product', function () {
  return {
    name: casual.sentence,
    description: casual.description,
    price: casual.integer(0, 99999),
    user: '603f9f1fa2bff13280f45ba0',
    rating: casual.integer(1, 5) + 0.5,
    images: [{ public_id: 'pb1', url: 'u1' }],
    category: casual.random_element([
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
    ]),
    seller: casual.word,
    stock: casual.integer(0, 99999),
    numOfReviews: casual.integer(0, 99999),
    reviews: [],
  };
});

let products = [];

for (let i = 0; i < 10; i++) {
  products.push(casual.product);
}

module.exports = products;
