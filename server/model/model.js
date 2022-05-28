const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  lampName: {
    type: String,
    required: false,
  },
  longitude: {
    type: Number,
    required: true,
    unique: false,
  },
  lattitude: {
    type: Number,
    required: true,
    unique: false,
  },
  address: {
    type: String,
    required: false,
  },
  logs: {
      type: Array,
      default: [],
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Lampdb = mongoose.model("Lampdb", schema);

module.exports = Lampdb;
