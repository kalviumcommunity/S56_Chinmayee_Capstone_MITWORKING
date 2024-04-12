const express = require('express');
const registerUser = require('./controller/AuthController.js');
const router = express.Router()

router.get('/' , (req, res) =>{
    try {
        res.status(200).send("home page")
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
})

router.post('/register', registerUser)

module.exports = router  