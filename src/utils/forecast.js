const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //puxar a location da cidade
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3c40897d844ef8da0a4d3075e59a205f&lang=pt_br&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const tempoRaw = body.main.temp;
      const temperatura = tempoRaw.toFixed(0);
      const feelsLikeRaw = body.main.feels_like;
      const feelsLike = feelsLikeRaw.toFixed(0);

      callback(
        undefined,

        " A temperatura é de " +
          temperatura +
          "°C, com sensação térmica de " +
          feelsLike +
          "°C e  " +
          body.weather[0].description +
          "."
      );
    }
  });
};

module.exports = forecast;
