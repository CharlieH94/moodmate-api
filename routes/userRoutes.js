const express = require("express");
const userController = require("./../controllers/userControllers");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
// router.post("/resetPassword", authController.resetPassword);

router.route("/").get(userController.getAllUsers);

router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
