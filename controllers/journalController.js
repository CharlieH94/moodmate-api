const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const Journal = require("./../models/journalModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllEntries = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Journal.find({
      // _id: req.params.quoteId,
      user: req.user._id,
    }),
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
    howAreYouFeeling: req.body.howAreYouFeeling,
  });

  res.status(201).json({
    status: "success",
    data: {
      entry,
    },
  });
});

// exports.getEntry = catchAsync(async (req, res, next) => {
//   const entry = await Journal.findById(req.params.entryId);

//   if (!entry) {
//     return next(new AppError("No entry found", 404));
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       entry,
//     },
//   });
// });

exports.deleteEntry = catchAsync(async (req, res, next) => {
  const entry = await Journal.findByIdAndDelete(req.params.entryId);

  if (!entry) {
    return next(new AppError("No entry found", 404));
  }

  await entry.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getEntryByDate = catchAsync(async (req, res, next) => {
  const entries = await Journal.find({
    user: req.user._id,
  });

  const dateString = req.params.dateString;
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const matchingEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    const entryDay = entryDate.getUTCDate();
    const entryMonth = entryDate.getUTCMonth() + 1;
    const entryYear = entryDate.getUTCFullYear();

    return entryDay === day && entryMonth === month && entryYear === year;
  });

  res.status(200).json({
    status: "success",
    results: matchingEntries.length,
    data: {
      entries: matchingEntries,
    },
  });
});
