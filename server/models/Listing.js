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

  price: {
    type: Number,
    default: null,
  },

  approved: {
    type: Boolean,
    default: false,
  },

  userEmail: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Listing",
  listingSchema
);