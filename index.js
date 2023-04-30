require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const weatherRoute = require("./src/routes/weather.route");
const searchRoute = require("./src/routes/search.route");
const connection = require("./src/connection");
app.use(
  express.urlencoded({
    extended: true,
  })
);
connection();
app.use(express.json());

app.use(
  morgan(
    "[:method] :url :date[web] :remote-addr => :status :response-time ms :res[content-length] bytes"
  )
);
app.use(cors());

app.use("/weather", weatherRoute);
app.use("/search", searchRoute);

app.listen(5000, () => {
  console.log("server is running");
});
