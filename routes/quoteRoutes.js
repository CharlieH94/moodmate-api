const express = require("express");
const userController = require("./../controllers/userControllers");
const authController = require("./../controllers/authController");
const quotesController = require("./../controllers/quotesController");

const router = express.Router();

router.route("/").get(authController.protect, quotesController.getAllQuotes);

router.post("/addQuote", authController.protect, quotesController.addQuote);

module.exports = router;
