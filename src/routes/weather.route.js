const weatherRoute = require("express").Router();
const weatherController = require("../controllers/weather.controller");

weatherRoute.post("/", weatherController.getData);
weatherRoute.get("/", weatherController.getTweets);

module.exports = weatherRoute;
