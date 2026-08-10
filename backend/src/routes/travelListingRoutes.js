const express = require("express");
const router = express.Router();

const travelListingController = require("../controllers/travelListingController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post(
  "/",
  jwtMiddleware.verifyToken,
  travelListingController.createTravelListing,
);

router.put(
    "/:travelID",
    jwtMiddleware.verifyToken,
    travelListingController.updateTravelListing
);

router.delete(
    "/:travelID",
    jwtMiddleware.verifyToken,
    travelListingController.deleteTravelListing
);

router.get("/", travelListingController.getAllTravelListings);

router.get("/search", travelListingController.searchTravelListings);

module.exports = router;
