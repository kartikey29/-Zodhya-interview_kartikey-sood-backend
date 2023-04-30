const mongoose = require("mongoose");

module.exports = async (request, response, next) => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.db);
  console.log("connected");
};
