exports.googleApiURL = (req, res) => {
  const apiURL = process.env.API_URL.replace(
    "<API_KEY>",
    process.env.REACT_APP_API_KEY
  );
  res.send(apiURL);
};
