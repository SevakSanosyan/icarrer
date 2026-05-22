const Listing =
require("../models/Listing");

const createListing =
async (req, res) => {

  try {

    const {

      title,

      qualifications,

      description,

      companyInfo,

      salaryType,

      salary,

      userEmail,

    } = req.body;

    const image =
    req.file

      ? `/uploads/${req.file.filename}`

      : "";

    const listing =
    await Listing.create({

      title,

      qualifications,

      description,

      companyInfo,

      salaryType,

      salary,

      image,

      userEmail,

      userId:
      req.user.id,

    });

    res.status(201).json(
      listing
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getListings = async (req, res) => {

  try {

    const {
      sort,
    } = req.query;

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "old") {

      sortOption = {
        createdAt: 1,
      };

    }

    if (sort === "salary-high") {

      sortOption = {
        price: -1,
      };

    }

    if (sort === "salary-low") {

      sortOption = {
        price: 1,
      };

    }

    const listings =
    await Listing.find({

      approved: true,

    }).sort(sortOption);

    res.json(listings);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getPendingListings =
async (req, res) => {

  try {

    const listings =
    await Listing.find({

      approved: false,

    });

    res.json(listings);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const approveListing =
async (req, res) => {

  try {

    await Listing.findByIdAndUpdate(

      req.params.id,

      {

        approved: true,

      }

    );

    res.json({

      message:
      "Approved",

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const deleteListing =
async (req, res) => {

  try {

    await Listing.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
      "Deleted",

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getListingById =
async (req, res) => {

  try {

    const listing =
    await Listing.findById(
      req.params.id
    );

    res.json(listing);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getAllListings =
async (req, res) => {

  try {

    const listings =
    await Listing.find()
    .sort({

      createdAt: -1,

    });

    res.json(listings);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getSingleListing =
async (req, res) => {

  try {

    const listing =
    await Listing.findById(
      req.params.id
    );

    res.json(listing);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

const getMyListings =
async (req, res) => {

  try {

    const listings =
    await Listing.find({

      userId:
      req.user.id,

    }).sort({

      createdAt: -1,

    });

    res.json(listings);

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

module.exports = {

  createListing,

  getListings,

  getPendingListings,

  approveListing,

  deleteListing,

  getListingById,

  getAllListings,

  getSingleListing,

  getMyListings,

};