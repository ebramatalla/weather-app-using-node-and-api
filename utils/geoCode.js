const request = require("request");

geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZWJyYWFtYXRhbGxhIiwiYSI6ImNsOGc1b2VybDA0cmwzb3E5dWd6OWpuZ3cifQ.qP1VzCfm0siUiYtxZ_2NeA";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to server ................ ", undefined);
    } else if (response.body.features.length == 0) {
      callback(
        "can not get the coordinates of the this location ****************",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
