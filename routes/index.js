const express = require("express");
const router = express.Router();

router.use("/video/", require("./videoRoutes"));

//____________________________

module.exports = router;
