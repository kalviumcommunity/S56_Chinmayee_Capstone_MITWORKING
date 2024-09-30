const express = require('express');
const router = express.Router()
const { loginUser, registerUser} = require('../controller/AuthController.js');
const { sendOTP, verifyOTP } = require('../controller/OTPController.js');
const {getUser, getUsersByIds, getAllUsers, updateUser, deleteUser, followUser, unfollowUser} = require("../controller/UserController.js")

// authentication
router.post("/register", registerUser)
router.post("/login", loginUser)

// user manipulation
router.get('/getall', getAllUsers)
router.get('/:id', getUser)
router.post('/getByIds', getUsersByIds);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

// user follow and unfollow
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

// OTP
router.post("/send-otp", sendOTP); 
router.post("/verify-otp", verifyOTP);

module.exports = router ; 