const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const apiURL = process.env.API_URL;

exports.googleApiURL = (req, res) => {
  res.send(apiURL);
};
