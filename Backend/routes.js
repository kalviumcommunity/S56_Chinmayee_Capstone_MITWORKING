const express = require('express')
const router = express.Router()

router.get('/' , (req, res) =>{
    try {
        res.status(200).send("home page")
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
})

module.exports = router  