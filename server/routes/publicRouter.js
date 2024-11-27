const GenreController = require("../controllers/GenreController");
const UserController = require("../controllers/UserController");
const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.loginGoogle);
router.get("/genres", GenreController.showGenres);

module.exports = router;
