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
  const quote = await Quote.create({
    user: req.user._id,
    quoteBody: req.body.quoteBody,
  });

  res.status(201).json({
    status: "success",
    data: {
      quote,
    },
  });
});

exports.updateQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOne({
    _id: req.params.quoteId,
    user: req.user._id,
  });

  if (!quote) {
    return next(new AppError("Quote not found or unauthorized to update", 404));
  }

  quote.quoteBody = req.body.quoteBody || quote.quoteBody;
  quote.author = req.body.author || quote.author;
  quote.updatedAt = Date.now();

  const updatedQuote = await quote.save();

  res.status(200).json({
    status: "success",
    data: {
      quote: updatedQuote,
    },
  });
});

exports.deleteQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOne({
    _id: req.params.quoteId,
    user: req.user._id,
  });

  if (!quote) {
    return next(new AppError("Quote not found or unauthorized to update", 404));
  }

  await quote.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
