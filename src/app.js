const path = require("path");
const express = require("express");
const { hasSubscribers } = require("diagnostics_channel");
const hbs = require("hbs");
const { query, response } = require("express");
const forecast = require("../utils/forecast");
const geoCode = require("../utils/geoCode");

const app = express();
// configuration of path
const publicDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

// set hbs config
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partials);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: " weather app",
    author: "ebram atalla",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: " about me ",
    author: "ebram atalla",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: " help  ",
    author: "ebram atalla",
  });
});
app.get("/pro", (req, res) => {
  console.log(req.query.search);
  res.send({
    pro: [],
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter address ",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/*", (req, res) => {
  res.render("404", {
    title: " help  ",
    author: "ebram atalla",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000 ...");
});
