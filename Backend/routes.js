const express = require('express');
const { loginUser, registerUser} = require('./controller/AuthController.js');
const router = express.Router()
const {getUser, updateUser, deleteUser} = require("./controller/UserController.js")

router.get('/' , (req, res) =>{
    try {
        res.status(200).send("home page")
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
})

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router ; 