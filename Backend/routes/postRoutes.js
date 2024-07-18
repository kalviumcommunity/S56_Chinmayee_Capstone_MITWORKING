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

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await PostModel.find({ userId });
        res.status(200).json(userPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
});

module.exports = router;
