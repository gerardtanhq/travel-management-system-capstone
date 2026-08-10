const model = require("../models/itineraryModel");

module.exports.createItinerary = (req, res) => {
    const { day, activity, travelID } = req.body;

    if (
        day === undefined ||
        !activity ||
        travelID === undefined
    ) {
        return res.status(400).json({
            message: "Day, activity and travelID are required"
        });
    }

    const data = {
        day,
        activity,
        travelID
    };

    model.insertSingle(data, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json({
            message: "Itinerary created successfully",
            itineraryID: results.insertId
        });
    });
};

module.exports.getItinerariesByTravelID = (req, res) => {
    const travelID = req.params.travelID;

    model.selectByTravelID(travelID, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(200).json(results);
    });
};