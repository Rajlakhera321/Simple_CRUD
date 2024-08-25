const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Token required" });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decode.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" })
    }
}

module.exports = { verify };