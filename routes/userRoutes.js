const express = require("express");
const userController = require("./../controllers/userControllers");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
