const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  createListing,
  getListings,
  getPendingListings,
  approveListing,
  deleteListing,
  getListingById,
  getAllListings,
  getSingleListing,
} = require("../controllers/ListingController");

router.post(
  "/",
  upload.single("image"),
  createListing
);

router.get(
  "/admin/all",
  getAllListings
);

router.get(
  "/pending",
  getPendingListings
);

router.get("/", getListings);

router.get("/:id", getListingById);

router.put(
  "/approve/:id",
  approveListing
);

router.delete(
  "/:id",
  deleteListing
);

router.get(
  "/:id",
  getSingleListing
);

module.exports = router;