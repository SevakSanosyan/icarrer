const mongoose =
require("mongoose");

const listingSchema =
new mongoose.Schema(

  {

    title: {

      type: String,

      required: true,

    },

    qualifications: {

      type: String,

      required: true,

    },

    description: {

      type: String,

      required: true,

    },

    employerInfo: {

      type: String,

      required: true,

    },

    price: {

      type: Number,

      default: 0,

    },

    isContract: {

      type: Boolean,

      default: false,

    },

    image: {

      type: String,

      required: true,

    },

    approved: {

      type: Boolean,

      default: false,

    },

    userEmail: {

      type: String,

      required: true,

    },

    userId: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

  },

  {

    timestamps: true,

  }

);

module.exports =
mongoose.model(

  "Listing",

  listingSchema

);