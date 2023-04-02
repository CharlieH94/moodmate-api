const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const quotesRouter = require("./routes/quoteRoutes");
const journalRouter = require("./routes/journalRoutes");
const googleVisionRouter = require("./routes/googleVisionRoutes");

const app = express();
app.use(cors());

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quotes", quotesRouter);
app.use("/api/v1/journal", journalRouter);
app.use("/api/v1/api-url", googleVisionRouter);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// EXPORT app
module.exports = app;
