const express = require('express');
const router = express.Router();
const { postCreate, getPost, getAllPosts, updatePost, deletePost, likePost } = require("../controller/PostController.js");

// Posts routes
router.post('/', postCreate);
router.get('/postss', getAllPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);

module.exports = router;
