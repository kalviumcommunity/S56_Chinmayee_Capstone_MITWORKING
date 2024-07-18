const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {type: String, require: true},
    username: { type: String, required: true },
    description: String,
    likes: [],
    image: String, 
},
{
    timestamps: true
})

const PostModel = mongoose.model("Posts", postSchema)
module.exports = PostModel;