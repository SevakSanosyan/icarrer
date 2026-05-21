
const express =
require("express");

const router =
express.Router();

const upload =
require("../config/multer");


const {

  createListing,
  getListings,
  getAllListings,
  approveListing,
  deleteListing,
  getSingleListing,
  getMyListings,

} = require(
  "../controllers/ListingController"
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

module.exports =
router;

