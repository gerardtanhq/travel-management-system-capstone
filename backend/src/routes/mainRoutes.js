const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const travelListingRoutes = require("./travelListingRoutes");
const itineraryRoutes = require("./itineraryRoutes");

router.use("/user", userRoutes);
router.use("/travel", travelListingRoutes);
router.use("/itinerary", itineraryRoutes);

module.exports = router;