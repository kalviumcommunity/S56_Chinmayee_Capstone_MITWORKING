const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    password:{type: String, required: true},
    email: {type: String, required: true},
    isAdmin:{type: Boolean, default: false},
    profilePicture: {type: String},
    coverPicture: {type: String},
    age: {type: Number},
    course: {type: String},
    year: {type: String},
    hobbies: {type: String},
    club: {type: String},
    bio:{type: String},
    followers: [],
    following: []
})


const UserModel = mongoose.model("Users", userSchema)
module.exports = UserModel;