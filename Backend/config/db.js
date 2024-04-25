require('dotenv').config();

const config = {
    mongoURI: process.env.MONGO_URI,
    Port: process.env.PORT,
};
  
module.exports = config;