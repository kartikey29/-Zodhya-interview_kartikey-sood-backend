const searchRoute = require("express").Router();
const searchController = require("../controllers/recentSearch.controller");

searchRoute.post("/", searchController.addSearch);
searchRoute.get("/", searchController.getSearch);

module.exports = searchRoute;
