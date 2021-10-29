const path = require("path");
const express = require("express");
const hbs = require("hbs");
const Qs = require("qs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath));

//setup dinamic directory to serve
app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: " Yas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: " Yas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: " ",
    name: " Yas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Você deve inserir um endereço!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        try {
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        } catch (error) {
          return res.send({ error });
        }
      });
    }
  );
});

app.get("/currentweather", (req, res) => {
  const { lat, long } = Qs.parse(req.query, {
    ignoreQueryPrefix: true,
  });

  if (!req.query) {
    return res
      .status(400)
      .send({ error: "Não foi possivel pegar sua localização!" });
  }

  forecast(lat, long, (error, forecastData) => {
    try {
      res.send({
        forecast: forecastData,
      });
    } catch (error) {
      return res.status(400).send({ error: "esse" });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: " Yas",
    title: "Help",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: " Yas",
    errorMessage: "Page not found",
    title: "404",
  });
});

app.listen(port);
