const PotionController = require("../controllers/PotionController");

const router = require("express").Router();
// router.get("/cauldrons/:cauldronId/potions", (req, res)=>{res.json("sss")});
router.post("/cauldrons/:cauldronId/potions", PotionController.createPotion);

module.exports = router;
