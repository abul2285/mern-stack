const app = require('./app.js');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database.js');

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// database connection
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log({ err });
  console.log('Shuting down server due to the unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
