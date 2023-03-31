const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const Journal = require("./../models/journalModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllEntries = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Journal.find({ user: req.user._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const entries = await features.query;

  res.status(200).json({
    status: "success",
    results: entries.length,
    data: {
      entries,
    },
  });
});

exports.addEntry = catchAsync(async (req, res, next) => {
  const entry = await Journal.create({
    user: req.user._id,
    mood: req.body.mood,
    overview: req.body.overview,
    diet: req.body.diet,
    exercise: req.body.exercise,
  });

  res.status(201).json({
    status: "success",
    data: {
      entry,
    },
  });
});
