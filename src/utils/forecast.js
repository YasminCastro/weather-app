const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //puxar a location da cidade
  const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    const weather_description =
      body.current.weather_descriptions[0].toLowerCase();

    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        " A temperatura é de " +
          body.current.temperature +
          "°c, com sensação térmica de " +
          body.current.feelslike +
          "°c e o dia será " +
          weather_description +
          "."
      );
    }
  });
};

module.exports = forecast;
