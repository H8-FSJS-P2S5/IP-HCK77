const authentication = require("../middleware/authentication");
const errorHandler = require("../middleware/errorHandler");
const router = require("express").Router();
const authRouter = require("./authRouter");
const publicRouter = require("./publicRouter");

router.get("/", (req, res) => res.json("HOME"));

router.use("/", publicRouter);
router.use("/", authentication, authRouter);

router.use(errorHandler);

module.exports = router;
