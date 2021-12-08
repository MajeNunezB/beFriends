const express = require("express");
const app = express();

//limit of megaBites
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

const upload = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedRespose = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "Mypicture", //name of the file in cloudinary
    });
    console.info(uploadedRespose);
    res.status(200).json({ status: 200, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong getting all users 😭",
    });
  }
};

module.exports = { upload };
