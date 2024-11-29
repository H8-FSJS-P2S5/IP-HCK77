function errorHandler(err, req, res, next) {
  console.log("🚀 ~ errorHandler ~ err:", err);
  if (err.name == "JsonWebTokenError") {
    res.status(401).json({
      message: "Invalid Token",
    });
    return;
  } else if (err.name == "Validation Error") {
    res.status(400).json({ message: err.message });
  } else if (err.name == "SequelizeValidationError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name == "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: "Email must be unique" });
  } else if (err.name == "Authentication Failed") {
    res.status(401).json({ message: err.message });
  } else if (err.name == "Forbidden") {
    res.status(403).json({ message: err.message });
  } else if (err.name == "Not Found") {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = errorHandler;
