const model = require("../models/travelListingModel");

module.exports.createTravelListing = (req, res) => {
    const {
        title,
        description,
        price,
        country,
        travelPeriod,
        imageURL
    } = req.body;

    if (
        !title ||
        !description ||
        price === undefined ||
        !country ||
        !travelPeriod ||
        !imageURL
    ) {
        return res.status(400).json({
            message: "All travel listing fields are required"
        });
    }

    const data = {
        title,
        description,
        price,
        country,
        travelPeriod,
        imageURL
    };

    model.insertSingle(data, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json({
            message: "Travel listing created successfully",
            travelID: results.insertId
        });
    });
};

module.exports.getAllTravelListings = (req, res) => {
    model.selectAll((error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(200).json(results);
    });
};

module.exports.searchTravelListings = (req, res) => {
    const description = req.query.description;

    if (!description) {
        return res.status(400).json({
            message: "Description search text is required"
        });
    }

    model.selectByDescription(description, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.status(200).json(results);
    });
};

module.exports.updateTravelListing = (req, res) => {
    const travelID = req.params.travelID;

    const {
        title,
        description,
        price,
        country,
        travelPeriod,
        imageURL
    } = req.body;

    if (
        !title ||
        !description ||
        price === undefined ||
        !country ||
        !travelPeriod ||
        !imageURL
    ) {
        return res.status(400).json({
            message: "All travel listing fields are required"
        });
    }

    const data = {
        title,
        description,
        price,
        country,
        travelPeriod,
        imageURL
    };

    model.updateById(travelID, data, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Travel listing not found"
            });
        }

        res.status(200).json({
            message: "Travel listing updated successfully"
        });
    });
};

module.exports.deleteTravelListing = (req, res) => {
    const travelID = req.params.travelID;

    model.deleteById(travelID, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        const travelDeleteResult = results[1];

        if (travelDeleteResult.affectedRows === 0) {
            return res.status(404).json({
                message: "Travel listing not found"
            });
        }

        res.status(200).json({
            message: "Travel listing deleted successfully"
        });
    });
};