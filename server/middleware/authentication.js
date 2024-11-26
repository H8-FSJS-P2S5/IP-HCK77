const { verifyToken } = require("../helpers/jwtGenerator");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }
    const [type, token] = authHeader.split(" ");
    if (type.toLowerCase() != "bearer" || !token) {
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }

    const { id } = verifyToken(token);
    if (!id) {
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }
    let user = await User.findByPk(id);
    if (!user) {
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
