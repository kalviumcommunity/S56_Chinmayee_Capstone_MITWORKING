const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps:  true,
    }
);

const MessageModel = mongoose.model("message", MessageSchema)
module.exports = MessageModel;