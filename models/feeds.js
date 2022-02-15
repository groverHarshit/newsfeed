var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require("moment");

const Feed = Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
      ref: "User",
    },
    tech: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feed", Feed);
