const { Cauldron } = require("../models");

class CauldronController {
  static async showCauldrons(req, res, next) {
    try {
      let cauldrons = await Cauldron.findAll({
        where: { UserId: req.user.id },
      });
      res.status(200).json({
        cauldrons,
      });
    } catch (error) {
      console.log("🚀 ~ CauldronController ~ showCauldrons ~ error:", error);
      next(error);
    }
  }
}

module.exports = CauldronController;
