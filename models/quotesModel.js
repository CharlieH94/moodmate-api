const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A quote must belong to a user"],
  },
  quoteBody: {
    type: String,
    trim: true,
    required: [true, "A quote must have text"],
    unique: true,
  },
  author: {
    type: String,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    unique: true,
  },
  updatedAt: {
    type: Date,
    unique: true,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
