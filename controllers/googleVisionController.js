const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const apiURL = process.env.API_URL;
console.log(apiURL);

exports.googleApiURL = (req, res) => {
  res.send(apiURL);
};
