const model = require("../models/userModel");

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    model.selectByEmail(email, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const admin = results[0];

        res.locals.adminID = admin.adminID;
        res.locals.name = admin.name;
        res.locals.email = admin.email;

        res.locals.password = password;
        res.locals.hashedPassword = admin.password;

        next();
    });
};

module.exports.sendToken = (req, res) => {
    res.status(200).json({
        message: "Login successful",
        adminID: res.locals.adminID,
        name: res.locals.name,
        email: res.locals.email,
        token: res.locals.token
    });
};