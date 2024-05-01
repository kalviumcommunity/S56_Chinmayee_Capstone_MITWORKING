const express = require('express');
const { loginUser, registerUser} = require('../controller/AuthController.js');
const router = express.Router()
const {getUser, updateUser, deleteUser, followUser, unfollowUser} = require("../controller/UserController.js")

// authentication
router.post("/register", registerUser)
router.post("/login", loginUser)

// user manipulation
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

// user follow and unfollow
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

module.exports = router ; 