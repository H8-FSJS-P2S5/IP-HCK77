const jwt = require("jsonwebtoken");
const generateToken = (data) => {
  return jwt.sign({ id: data }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
