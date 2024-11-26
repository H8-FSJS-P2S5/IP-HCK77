const PotionController = require("../controllers/PotionController");
const ProfileController = require("../controllers/ProfileController");

const router = require("express").Router();
router.post("/cauldrons/:cauldronId/potions", PotionController.createPotion);
router.put("/profile/", ProfileController.updateProfile);

module.exports = router;
