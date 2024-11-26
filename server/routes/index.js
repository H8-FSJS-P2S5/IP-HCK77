const GenreController = require("../controllers/GenreController");
const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentication");
const errorHandler = require("../middleware/errorHandler");
const router = require("express").Router();
const authRouter = require("./authRouter");


router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.loginGoogle);
router.get("/genres", GenreController.showGenres);
router.use("/", authentication, authRouter);
router.use(errorHandler);

module.exports = router;
