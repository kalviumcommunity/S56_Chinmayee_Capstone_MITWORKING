const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({ username, password: hashedPass, email });

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async(req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})
        if(user){
            const validity = await bcrypt.compare(password, user.password)

            validity? res.status(200).json(user) : res.status(400).json("Wrong Password!")
        }
        else{
            res.status(404).json("User does not exist!")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {registerUser , loginUser}