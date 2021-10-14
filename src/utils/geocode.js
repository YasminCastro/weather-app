const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieWFzbWluc2RjYXN0cm8iLCJhIjoiY2t1bXdhYWtmM3dzNjJvbzgzZjFiMm1hYyJ9.blHdo46KvuoiZE0VhIBzoA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Não foi possivel conectar aos serviçoes de localização!",
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        "Não foi possivel encontrar a localização. Tente novamente.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
