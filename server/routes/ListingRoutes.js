const express =
require("express");

const router =
express.Router();

const upload =
require("../config/multer");

const {

  createListing,
  getListings,
  approveListing,
  deleteListing,
  getAllListings,
  getSingleListing,
  getMyListings,
  updateListing,
  removeListing,

} = require(
  "../controllers/listingController"
);

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createListing
);

router.get(
  "/",
  getListings
);

router.get(
  "/admin/all",
  getAllListings
);

/* ADMIN */

router.put(
  "/admin/approve/:id",
  approveListing
);

router.delete(
  "/admin/:id",
  deleteListing
);

/* USER */

router.get(
  "/my",
  authMiddleware,
  getMyListings
);

router.get(
  "/:id",
  getSingleListing
);

router.put(
  "/:id",
  authMiddleware,
  updateListing
);

router.delete(
  "/:id",
  authMiddleware,
  removeListing
);

module.exports =
router;