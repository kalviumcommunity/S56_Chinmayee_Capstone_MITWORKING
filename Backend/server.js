require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require('cors')
const config = require('./config/db.js')


const app = express();
const corsOptions ={
   origin:'http://localhost:5173',
//    origin:'https://dreamy-platypus-548888.netlify.app/', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/", routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = config.Port || 3200;

    
app.get("/" , (req,res)=>{
    mongoose.connection.readyState === 1 ? res.send("MongoDb Connected") : res.send("MongoDb not Connected")
})
  
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

const connectToDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log('connected to mongoDB');
    } catch (err) {
        console.error('error connecting to mongoDB:', err.message);
    }
};
  
  
const disconnectFromDB = async () => {
    try {
        await mongoose.connection.close()
        console.log('disconnected from mongoDB');
    } catch (err) {
        console.error('error disconnecting from mongoDB:', err.message);
    }
};


if (require.main === module) {
    app.listen(PORT, (err) => {
    connectToDB()
    if (err) console.error(err);
    else console.log(`server running on PORT: ${PORT}`);
    });
}