const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./../models/userModel");

dotenv.config({ path: "./../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful"));

// READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/userData.json`, "utf-8")
);

const quotes = JSON.parse(
  fs.readFileSync(`${__dirname}/quoteData.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
