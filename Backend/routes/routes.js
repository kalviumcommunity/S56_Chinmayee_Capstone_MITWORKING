const express = require('express');
const router = express.Router()
const { loginUser, registerUser} = require('../controller/AuthController.js');
const {getUser, getAllUsers, updateUser, deleteUser, followUser, unfollowUser} = require("../controller/UserController.js")

// authentication
router.post("/register", registerUser)
router.post("/login", loginUser)

// user manipulation
router.get('/getall', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

// user follow and unfollow
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

module.exports = router ; 