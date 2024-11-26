const CauldronController = require("../controllers/CauldronController");
const PotionController = require("../controllers/PotionController");
const ProfileController = require("../controllers/ProfileController");
const { guardCauldron } = require("../middleware/authorization");

const router = require("express").Router();
router.post("/cauldrons/:cauldronId/potions", PotionController.createPotion);
router.put("/profile/", ProfileController.updateProfile);
router.get("/cauldrons", CauldronController.showCauldrons);
router.put(
  "/cauldrons/:cauldronId",
  guardCauldron,
  CauldronController.updateCauldrons
);

module.exports = router;
