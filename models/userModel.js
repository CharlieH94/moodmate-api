const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "You must enter a first name"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "You must enter a last name"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "You must enter a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "You must enter an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  profilePhoto: {
    type: String,
    default: "default.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
