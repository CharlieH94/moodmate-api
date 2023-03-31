const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/api-url", (req, res) => {
  const apiURL = process.env.API_URL;
  res.send(apiURL);
});

module.exports = router;
