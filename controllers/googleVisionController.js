exports.googleApiURL = (req, res) => {
  const apiURL = process.env.API_URL;
  res.send(apiURL);
};
