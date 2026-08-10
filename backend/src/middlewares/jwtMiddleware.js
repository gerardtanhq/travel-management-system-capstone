const jwt = require("jsonwebtoken");

module.exports.generateToken = (req, res, next) => {
    const payload = {
        adminID: res.locals.adminID,
        email: res.locals.email
    };

    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        options
    );

    res.locals.token = token;

    next();
};

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token is required"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        res.locals.adminID = decodedToken.adminID;
        res.locals.email = decodedToken.email;

        next();
    });
};