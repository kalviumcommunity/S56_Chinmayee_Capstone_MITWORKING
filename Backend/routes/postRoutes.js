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
    const result = await fetchPostsByUserId(userId);

    if (result.status === 'success') {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ error: result.message });
    }
});

module.exports = router;
