var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { convertPassword } = require("../services/bcrypt.service");

const User = Schema(
  {
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    country_code: {
      type: String,
      default: "+91",
    },
    contactNo: {
      type: String,
      default: "",
    },
    date_of_birth: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      enum: ["hindi", "english"],
      default: "english",
    },
    time_of_birth: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    marital_status: {
      type: String,
      enum: ["married", "un-married", "others"],
      default: "married",
    },
  },
  {
    timestamps: true,
  }
);

User.pre("save", function () {
  this.password = convertPassword(this.password);
});

module.exports = mongoose.model("User", User);
