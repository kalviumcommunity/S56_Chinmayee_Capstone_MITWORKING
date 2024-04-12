const mongoose = require("mongoose")

const userShecma = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        isAdmind: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        age: Number,
        course: String,
        year: String,
        hobbies: String,
        club: String,
        bio:String,
        followers: [],
        following: []
    }
)

const UserModel = mongoose.model("Users", userShecma)
module.exports = UserModel;