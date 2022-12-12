const mongoose = require("mongoose");

const Car = mongoose.model(
  "Car",
  new mongoose.Schema({
    model: String,
    price: Number,
    phone: String,
    city: String,
    pictures: Array
  })
);

module.exports = Car;
