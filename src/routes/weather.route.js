const weatherRoute = require("express").Router();
const weatherController = require("../controllers/weather.controller");

weatherRoute.post("/", weatherController.getData);

module.exports = weatherRoute;
