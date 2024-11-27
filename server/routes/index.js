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

const publicRouter = require("express").Router();
publicRouter.get("/", (req, res) => res.json("HOME"));
publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);
publicRouter.post("/login/google", UserController.loginGoogle);
publicRouter.get("/genres", GenreController.showGenres);
// router.use("/user", authRouter);

const privateRouter = require("express").Router();
privateRouter.use(authentication);
privateRouter.post(
  "/cauldrons/:cauldronId/potions",
  PotionController.createPotion
);
privateRouter.put("/profile/", ProfileController.updateProfile);
privateRouter.get("/cauldrons", CauldronController.showCauldrons);
privateRouter.put(
  "/cauldrons/:cauldronId",
  guardCauldron,
  CauldronController.updateCauldron
);
privateRouter.put(
  "/cauldrons/:cauldronId/potions/:potionId",
  guardCauldron,
  PotionController.updatePotion
);
privateRouter.delete(
  "/cauldrons/:cauldronId/potions/:potionId",
  guardCauldron,
  PotionController.deletePotion
);

router.use(publicRouter);
router.use(privateRouter);
router.use(errorHandler);

module.exports = router;
