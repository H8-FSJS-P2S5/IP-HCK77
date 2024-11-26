const { Product, User, Category } = require("../models");
const category = require("../models/category");

class CategoryController {
  static async showCategories(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json({
        message: "Successfully Show All Categories",
        categories,
      });
    } catch (error) {
      console.log("🚀 ~ CategoryController ~ showCategories ~ error:", error);
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      req.body.authorId = req.user.id; //assign body with current user
      let createdCategory = await Category.create(req.body);
      res.status(201).json({
        message: `Successfully Add ${createdCategory.name}`,
        category: createdCategory,
      });
    } catch (error) {
      console.log("🚀 ~ CategoryController ~ addCategory ~ error:", error);
      next(error);
    }
  }

  static async editCategoryById(req, res, next) {
    try {
      let { id } = req.params;
      let category = await Category.findByPk(id);
      if (!category) {
        next({
          name: "Not Found",
          message: `Error category with id: ${id} not found`,
        });
        return;
      }

      req.body.authorId = req.user.id; //assign body with current user

      let updatedCategory = await category.update(req.body);
      res.status(200).json({
        message: `Successfully Edit Category with ID: ${id}`,
        category: updatedCategory,
      });
    } catch (error) {
      console.log("🚀 ~ CategoryController ~ editCategoryById ~ error:", error);
      next(error);
    }
  }
}

module.exports = CategoryController;
