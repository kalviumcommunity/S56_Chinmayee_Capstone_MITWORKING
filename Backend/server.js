const http = require('http');
const { Server } = require('socket.io');

require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes.js");
const mongoose = require("mongoose");
const cors = require('cors')
const config = require('./config/db.js')
const postRoutes = require("./routes/postRoutes.js");
const uploadRoute = require('./routes/uploadRoute.js');
const ChatRoute = require('./routes/ChatRoute.js');
const MessageRoute = require('./routes/MessageRoute.js')

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'hhttps://mitworking.netlify.app/',
        methods: ['GET', 'POST']
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
};


const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('a user connected');

    // add user
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    // send message
    socket.on('sendMessage', ({ senderId, receiverId, text, chatId }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
            chatId,
        });
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);

    });
});

// const corsOptions ={
// //    origin:'http://localhost:5173',
//    origin:'https://mitworking.netlify.app', 
//    credentials:true,           
//    optionSuccessStatus:200,
// }

app.use(cors())
app.use(express.json());
app.use("/", routes);
app.use("/posts", postRoutes);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use(uploadRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
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
