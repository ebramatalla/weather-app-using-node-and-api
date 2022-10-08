const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7960d0398568b07b80e9ca52931c2790&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to server ................ ", undefined);
    } else if (response.body.error == 0) {
      callback(response.body.error, undefined);
    } else {
      callback(
        undefined,
        "the weather is " +
          response.body.current.weather_descriptions[0] +
          " and it fell like " +
          response.body.current.feelslike +
          " And the probability of rain is " +
          response.body.current.precip +
          "%"
      );
    }
  });
};

module.exports = forecast;
