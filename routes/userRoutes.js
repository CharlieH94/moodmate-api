const express = require("express");
const userController = require("./../controllers/userControllers");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/").get(userController.getAllUsers);

router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
