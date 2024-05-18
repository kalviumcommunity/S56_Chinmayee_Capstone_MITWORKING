const cloudinary = require("cloudinary")
require("dotenv").config();

function configureCloudinary() {
    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        console.error("Cloudinary configuration environment variables missing");
        process.exit(1)
    }

    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET
    });

    console.log("Cloudinary configuration successful.");
}

configureCloudinary();

module.exports = cloudinary;