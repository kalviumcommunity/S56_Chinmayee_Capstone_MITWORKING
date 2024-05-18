const express = require('express');
const router = express.Router()
const {postCreate, getPost, updatePost, deletePost, likePost} = require("../controller/PostController.js")

// posts
router.post('/', postCreate)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)

module.exports = router ; 