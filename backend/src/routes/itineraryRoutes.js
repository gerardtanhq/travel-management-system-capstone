const express = require("express");
const router = express.Router();

const itineraryController = require("../controllers/itineraryController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post(
    "/",
    jwtMiddleware.verifyToken,
    itineraryController.createItinerary
);

router.get(
    "/:travelID",
    itineraryController.getItinerariesByTravelID
);

module.exports = router;