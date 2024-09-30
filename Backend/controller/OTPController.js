const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// In-memory store for simplicity. In production, use Redis or store OTP in the database.
let otpStore = {};

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can choose your email provider (e.g., Gmail)
    auth: {
        user: process.env.EMAIL_USER, // your email here
        pass: process.env.EMAIL_PASS  // your email password here
    }
});

// Generate and send OTP
const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json("User with this email does not exist.");
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        otpStore[email] = { otp, expiresAt: Date.now() + 300000 }; 

        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}`, 
        });

        res.status(200).json("OTP sent successfully.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        if (!otpStore[email] || otpStore[email].otp !== otp || Date.now() > otpStore[email].expiresAt) {
            return res.status(400).json("Invalid or expired OTP.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        await UserModel.findOneAndUpdate({ email }, { password: hashedPass });

        delete otpStore[email];

        res.status(200).json("Password reset successful.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendOTP, verifyOTP };
