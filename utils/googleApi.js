const express = require("express");
const router = express.Router();
const googleVisionController = require("./../controllers/googleVisionController");

router.route("/").get(googleVisionController.googleApiURL);

module.exports = router;
