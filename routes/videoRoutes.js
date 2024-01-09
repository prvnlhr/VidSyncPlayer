const express = require("express");
const router = express.Router();

const multerUpload = require("../middleware/multerUpload.js");
const videoController = require("../controllers/videoController");

router.post("/upload", multerUpload, videoController.uploadVideo);

router.get("/getVideos", videoController.getAllVideos);
module.exports = router;
