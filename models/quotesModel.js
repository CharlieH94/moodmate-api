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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
