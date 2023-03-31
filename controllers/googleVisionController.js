const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const apiURL = process.env.API_URL.replace(
  "<API_KEY>",
  process.env.REACT_APP_API_KEY
);

exports.googleApiURL = (req, res) => {
  res.send(apiURL);
};
