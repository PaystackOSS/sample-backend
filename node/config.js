const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  hostname: process.env.API_URL,
  secretKey: process.env.API_KEY,
  port: process.env.PORT
};