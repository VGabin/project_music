const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (token) {
            const payload = await jwt.verify(token, jwtKey);
            req.user = payload;
            next();
        } else {
            res.status(403).json({ message: "Accès interdit: token manquant" });
        }
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Accès interdit: mauvais token" });
    }
};

exports.isAdmin = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Accès interdit: permissions refusées" });
    }
};
