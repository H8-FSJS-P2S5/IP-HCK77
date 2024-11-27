const GenreController = require("../controllers/GenreController");
const UserController = require("../controllers/UserController");
const CauldronController = require("../controllers/CauldronController");
const PotionController = require("../controllers/PotionController");
const ProfileController = require("../controllers/ProfileController");
const authentication = require("../middleware/authentication");
const errorHandler = require("../middleware/errorHandler");
const { guardCauldron } = require("../middleware/authorization");
const router = require("express").Router();
// const authRouter = require("./authRouter");

router.get("/", (req, res) => res.json("HOME"));
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.loginGoogle);
router.get("/genres", GenreController.showGenres);
// router.use("/user", authRouter);
router.use(authentication);
router.post("/cauldrons/:cauldronId/potions", PotionController.createPotion);
router.put("/profile/", ProfileController.updateProfile);
router.get("/cauldrons", CauldronController.showCauldrons);
router.put(
  "/cauldrons/:cauldronId",
  guardCauldron,
  CauldronController.updateCauldron
);
router.put(
  "/cauldrons/:cauldronId/potions/:potionId",
  guardCauldron,
  PotionController.updatePotion
);
router.delete(
  "/cauldrons/:cauldronId/potions/:potionId",
  guardCauldron,
  PotionController.deletePotion
);
router.use(errorHandler);

module.exports = router;
