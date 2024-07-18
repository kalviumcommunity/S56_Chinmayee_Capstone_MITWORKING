const PostModel = require("../models/postModel.js");
const mongoose = require("mongoose")

// Create Post
const postCreate = async(req, res)=>{
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json("New post created!")
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get Post a specific post

const getPost = async(req,res) =>{
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err); // Log the error for better debugging
        res.status(500).json({ message: err.message });
    }
};


// update post
const updatePost = async (req,res) =>{
    const postId = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(postId)
        if( post.userId === userId){
            await post.updateOne({$set : req.body})
            res.status(200).json("Post updated")
        }
        else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
   
// delete a post
const deletePost = async (req, res) =>{
    const id = req.params.id
    const {userId} = req.body
    
    try {
        const post = await PostModel.findById(id)
        if(post.userId === userId){
            await post.deleteOne()
            res.status(200).json("Post deleted!")
        }
        else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)   
    }
}

// like and dislike
const likePost = async (req,res) =>{
    const id = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push : {likes : userId}})
            res.status(200).json("Post Liked")
        }
        else{
            await post.updateOne({$pull : {likes : userId}})
            res.status(200).json("Post unliked")
        }
    } catch (error) {
        res.status(500).json(error)   
    }
}

module.exports = {postCreate, getPost,getAllPosts, updatePost, deletePost, likePost};

