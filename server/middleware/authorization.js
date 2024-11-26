const { Product } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role.toLowerCase() != "admin") {
      next({ name: "Forbidden", message: "You have no access" });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isStaff = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const user = req.user;    

    //if admin, can directly go
    if (user.role.toLowerCase() === "admin") {
      next();
      return;
    }

    //search product
    const product = await Product.findByPk(productId);

    //check product availability
    if (!product) {
      next({
        name: "Not Found",
        message: `Error product with ID: ${productId} not found`,
      });
      return;
    }
    //check if product associate with user
    if (product.authorId != user.id) {
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

module.exports = { isAdmin, isStaff };
