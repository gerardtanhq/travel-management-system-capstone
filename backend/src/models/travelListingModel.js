const pool = require("../services/db");

module.exports.insertSingle = (data, callback) => {
    const sqlStatement = `
        INSERT INTO travelListing
            (title, description, price, country, travelPeriod, imageURL)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const values = [
        data.title,
        data.description,
        data.price,
        data.country,
        data.travelPeriod,
        data.imageURL
    ];

    pool.query(sqlStatement, values, callback);
};

module.exports.selectAll = (callback) => {
    const sqlStatement = `
        SELECT *
        FROM travelListing;
    `;

    pool.query(sqlStatement, callback);
};

module.exports.selectByDescription = (description, callback) => {
    const sqlStatement = `
        SELECT *
        FROM travelListing
        WHERE description LIKE ?
        ORDER BY price ASC;
    `;

    const values = [`%${description}%`];

    pool.query(sqlStatement, values, callback);
};

module.exports.updateById = (travelID, data, callback) => {
    const sqlStatement = `
        UPDATE travelListing
        SET
            title = ?,
            description = ?,
            price = ?,
            country = ?,
            travelPeriod = ?,
            imageURL = ?
        WHERE travelID = ?;
    `;

    const values = [
        data.title,
        data.description,
        data.price,
        data.country,
        data.travelPeriod,
        data.imageURL,
        travelID
    ];

    pool.query(sqlStatement, values, callback);
};

module.exports.deleteById = (travelID, callback) => {
    const sqlStatement = `
        DELETE FROM itinerary
        WHERE travelID = ?;

        DELETE FROM travelListing
        WHERE travelID = ?;
    `;

    const values = [
        travelID,
        travelID
    ];

    pool.query(sqlStatement, values, callback);
};