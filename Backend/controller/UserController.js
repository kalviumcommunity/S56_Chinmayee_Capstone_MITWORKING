const UserModel = require("../models/userModel.js")
const bcrypt = require("bcrypt")

// getting a user
const getUser = async (req,res)=>{
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)

        if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No such user exists!")
        }    
    } catch (error) {
        res.status(500).json(error)
    }
}

// updating the details
const updateUser = async (req,res) =>{
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus, password} = req.body

    if(id === currentUserId || currentUserAdminStatus){

        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new:true})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)  
        }
    }
    else{
        res.status(403).json("Access Denied! you can only update your own profile!!")
    }
}

// deleting the user
const deleteUser = async (req,res) =>{
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus} = req.body

    if(id === currentUserId || currentUserAdminStatus){

        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)  
        }
    }
    else{
        res.status(403).json("Access Denied! you can only delete your own profile!!")
    }
}

// Following a user

const followUser = async (req,res)=>{
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)
            
            if (!followUser || !followingUser) {
                res.status(404).json("User not found");
                return;
            }

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json("Following sucessfully!")
            }
            else{
                res.status(403).json("User is already followed")
            }
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }
}

// Unfollowing a user

const unfollowUser = async (req,res)=>{
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (!followUser || !followingUser) {
                res.status(404).json("User not found");
                return;
            }
            
            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json("Unfollowed!")
            }
            else{
                res.status(403).json("User is not followed")
            }
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }
}



module.exports = {getUser, updateUser, deleteUser, followUser, unfollowUser}