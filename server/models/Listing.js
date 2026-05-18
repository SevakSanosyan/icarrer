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

  userEmail: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Listing",
  listingSchema
);