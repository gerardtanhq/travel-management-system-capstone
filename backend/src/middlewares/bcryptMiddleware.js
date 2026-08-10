const bcrypt = require("bcrypt");

module.exports.comparePassword = (req, res, next) => {
    const password = res.locals.password;
    const hashedPassword = res.locals.hashedPassword;

    bcrypt.compare(
        password,
        hashedPassword,
        (error, isMatch) => {
            if (error) {
                return res.status(500).json(error);
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            next();
        }
    );
};