const pool = require("../services/db");

module.exports.insertSingle = (data, callback) => {
    const sqlStatement = `
        INSERT INTO itinerary
            (day, activity, travelID)
        VALUES (?, ?, ?);
    `;

    const values = [
        data.day,
        data.activity,
        data.travelID
    ];

    pool.query(sqlStatement, values, callback);
};

module.exports.selectByTravelID = (travelID, callback) => {
    const sqlStatement = `
        SELECT *
        FROM itinerary
        WHERE travelID = ?
        ORDER BY day ASC;
    `;

    const values = [travelID];

    pool.query(sqlStatement, values, callback);
};