// const cloudinary = require("cloudinary");
import cloudinary from "cloud";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: "641831142742137",
  api_secret: CLOUDINARY_URL,
});
