const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema(
  {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    weather: {},
  },
  { timestamps: true }
);

const recentSearchModel = new mongoose.model(
  "recentSearch",
  recentSearchSchema
);
module.exports = recentSearchModel;
