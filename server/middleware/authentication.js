const { verifyToken } = require("../helpers/token");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("🚀 ~ authentication ~ authHeader:", authHeader);
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
      console.log("🚀 ~ authentication ~ id:", id);
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }
    let user = await User.findByPk(id);
    if (!user) {
      console.log("🚀 ~ authentication ~ user:", user);
      next({ name: "Authentication Failed", message: "Invalid Token" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("🚀 ~ authentication ~ error:", error);
    next(error);
  }
};

module.exports = authentication;
