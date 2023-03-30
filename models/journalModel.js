const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A quote must belong to a user"],
  },
  mood: {
    type: String,
    required: [true, "Journal entry must have a mood"],
    trim: true,
  },
  overview: {
    type: String,
  },
  diet: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
