const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  approved: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Listing",
  listingSchema
);