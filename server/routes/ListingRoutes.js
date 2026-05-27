
const express =
require("express");

const router =
express.Router();

const upload =
require("../config/multer");


const {

  createListing,
  getListings,
  getPendingListings,
  approveListing,
  deleteListing,
  getListingById,
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



router.put(
  "/approve/:id",
  approveListing
);

router.delete(
  "/:id",
  deleteListing
);

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

