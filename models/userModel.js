const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
  email: {
    type: String,
    required: [true, "You must enter an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  profilePhoto: {
    type: String,
    default: "default.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
