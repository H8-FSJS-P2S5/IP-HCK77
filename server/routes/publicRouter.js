const GenreController = require("../controllers/GenreController");
const RecommendationController = require("../controllers/RecommendationController");
const UserController = require("../controllers/UserController");
const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/auth/google", UserController.loginGoogle);
router.get("/genres", GenreController.showGenres);
router.post("/recommendation", RecommendationController.getRecommendation);

module.exports = router;
