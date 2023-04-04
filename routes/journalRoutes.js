const express = require("express");
const journalController = require("./../controllers/journalController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect, journalController.getAllEntries);

router.post("/entries", authController.protect, journalController.addEntry);

router
  .route("/entries/:entryId")
  // .get(authController.protect, journalController.getEntry)
  .delete(authController.protect, journalController.deleteEntry);

router
  .route("/entries/:date")
  .get(authController.protect, journalController.getEntriesByDate);

module.exports = router;
