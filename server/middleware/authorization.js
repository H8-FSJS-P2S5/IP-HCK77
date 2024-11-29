const { Cauldron } = require("../models");

const guardCauldron = async (req, res, next) => {
  try {
    const cauldronId = req.params.cauldronId;
    const user = req.user;
    //search product
    const cauldron = await Cauldron.findByPk(cauldronId);

    //check product availability
    if (!cauldron) {
      next({
        name: "Not Found",
        message: `Cauldron not found`,
      });
      return;
    }
    //check if product associate with user
    if (cauldron.UserId != user.id) {
      next({
        name: "Forbidden",
        message: `You have no access`,
      });
      return;
    }

    //next if true
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { guardCauldron };
