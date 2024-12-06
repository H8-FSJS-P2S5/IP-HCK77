const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

module.exports = async function authentication(req, res, next) {
    console.log("auth");

    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
        next({ name: "Unauthorized", message: "Invalid Token" });
        return;
    }

    const [, token] = bearerToken.split(" ");
    if (!token) {
        next({ name: "Unauthorized", message: "Invalid Token" });
        return;
    }
    try {
        const data = verifyToken(token);
        const user = await User.findByPk(data.id);
        if (!user) {
            next({ name: "Unauthorized", message: "Invalid Token" });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
