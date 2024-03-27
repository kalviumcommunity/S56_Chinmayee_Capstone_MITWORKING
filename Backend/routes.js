const express = require('express')
const router = express.Router()

router.get('/' , (req, res) =>{
    try {
        res.status(200).send("home")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router  