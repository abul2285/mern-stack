const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
    .then((res) => {
      console.log(`Mongodb Database connect with host: ${res.connection.host}`);
    });
};

module.exports = connectDatabase;
