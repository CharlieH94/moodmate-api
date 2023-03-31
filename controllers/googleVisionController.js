const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.googleApiURL = (req, res) => {
  const apiURL = process.env.API_URL;
  res.status(200).json({
    status: "success",
    data: {
      apiURL,
    },
  });
};
