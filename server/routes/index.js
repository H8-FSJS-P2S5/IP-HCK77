const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentication");
const errorHandler = require("../middleware/errorHandler");
const router = require("express").Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.use("/", authentication, devRoute);
router.use(errorHandler);

module.exports = router;
