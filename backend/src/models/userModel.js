const pool = require("../services/db");

module.exports.selectByEmail = (email, callback) => {
  const sqlStatement = `
        SELECT *
        FROM admin
        WHERE email = ?;
    `;

  const values = [email];

  pool.query(sqlStatement, values, callback);
};
