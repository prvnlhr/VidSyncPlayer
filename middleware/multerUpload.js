const multer = require("multer");

module.exports = multer({
    storage: multer.memoryStorage(), // Use memory storage instead of disk storage
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "videoFile") {
            // Handle video file validation
            if (!file.mimetype.match(/video\/*/) || !file.originalname.endsWith(".mp4")) {
                cb(new Error("Invalid video file"), false);
                return;
            }
        } else if (file.fieldname === "imageFile") {
            if (!file.mimetype.match(/jpeg|jpe|png|gif$i/)) {
                cb(new Error("File type not supported"), false);
                return;
            }
        }
        else if (file.fieldname === "subtitleFile") {
            // Handle subtitle file validation
            if (!file.mimetype.match(/text\/vtt/) || !file.originalname.endsWith(".vtt")) {
                cb(new Error("Invalid subtitle file"), false);
                return;
            }
        } else {
            // Handle other file types or unknown field names
            cb(new Error("Invalid file type or field name"), false);
            return;
        }

        cb(null, true);
    },
}).fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'subtitleFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
]);


