const PotionController = require("../controllers/PotionController");

const router = require("express").Router();
router.post("/cauldrons/:cauldronId/potions", PotionController.createPotion);

module.exports = router;
