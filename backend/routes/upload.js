// const express = require("express");
// const multer = require("multer");
// const Image = require("../model/image");
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Upload Route
// router.post("/uploads", upload.single("image"), async (req, res) => {
//   try {
//     console.log("File info:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     const newImage = new Image({
//       name: req.body.name,
//       imageUrl: req.file.path,
//     });
//     await newImage.save();
//     res.status(201).json({ message: "Image uploaded!", image: newImage });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// });

// // Get all images
// router.get("/images", async (req, res) => {
//   try {
//     const images = await Image.find();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch images" });
//   }
// });

// module.exports = router;
