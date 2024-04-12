const UserModel = require("../models/userModel.js");

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    const newUser = new UserModel({ username, password, email });

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = registerUser