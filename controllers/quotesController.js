const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const User = require("./../models/userModel");
const Quote = require("./../models/quotesModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllQuotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Quote.find({ user: req.user._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const quotes = await features.query;

  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: {
      quotes,
    },
  });
});

exports.addQuote = catchAsync(async (req, res, next) => {
  const newQuote = await Quote.create({
    user: req.user._id,
    mood: req.body.mood,
    quoteBody: req.body.quoteBody,
  });

  res.status(201).json({
    status: "success",
    data: {
      newQuote,
    },
  });
});
