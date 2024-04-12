require('dotenv').config();
const config = {
    mongoURI: process.env.MONGO_URI,
};
  
module.exports = config;