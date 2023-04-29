const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const weatherRoute = require("./src/routes/weather.route");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

require("dotenv").config({ path: "./local.env" });
app.use(
  morgan(
    "[:method] :url :date[web] :remote-addr => :status :response-time ms :res[content-length] bytes"
  )
);
app.use(cors());

app.use("/weather", weatherRoute);

app.listen(5000, () => {
  console.log("server is running");
});
