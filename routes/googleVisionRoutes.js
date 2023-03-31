const express = require("express");
const googleVisionController = require("./../controllers/googleVisionController");

const router = express.Router();

router.route("/").get(googleVisionController.googleApiURL);

module.exports = router;
