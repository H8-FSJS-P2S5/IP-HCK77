const convertImgToString = require("../helpers/convertBase64");
const { searchOption, filterOption } = require("../helpers/filterSearch");
const paginationOption = require("../helpers/pagination");
const sortOption = require("../helpers/sort");
const uploadFile = require("../helpers/upload");
const { Product, User, Category } = require("../models");

class ProductController {
  static async showProducts(req, res, next) {
    try {
      let option = {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Category,
          },
        ],
        order: [["createdAt", "ASC"]],
      };
      const { filter, sort, page, search } = req.query;

      //read pagination in sequelize docs
      let limit = 10;
      let pageNumber = 1;
      if (page) {
        option = paginationOption(page, option);
        limit = page.size ? page.size : limit;
        pageNumber = page.number ? page.number : pageNumber;
      }

      if (sort) {
        //can be use link this in route /products?sort[by]=createdAt&sort[order]=asc
        option = sortOption(sort, option);
      }

      if (search) {
        option = searchOption(search, option);
      }
      if (filter) {
        option = filterOption(filter, option);
      }

      let { count, rows } = await Product.findAndCountAll(option);
      res.status(200).json({
        message: "Successfully Display Products",
        page: +pageNumber,
        totalProduct: +count,
        totalPage: Math.ceil(count / limit), //data length divided with limit each page, to know page number. using ciel cause if minimum page quantity is 1
        products: rows,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ showProducts ~ error:", error);
      next(error);
    }
  }

  static async showProductById(req, res, next) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);
      if (!product) {
        next({
          name: "Not Found",
          message: `Error product with ID: ${id} not found`,
        });
        return;
      }

      res.status(200).json({
        message: "Successfully Display Product",
        product,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ showProductById ~ error:", error);
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      //add authorId to req.body
      req.body.authorId = req.user.id;
      let createdProduct = await Product.create(req.body);
      res.status(201).json({
        message: `Successfully Added ${createdProduct.name}`,
        product: createdProduct,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ addProduct ~ error:", error);
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);

      //check if data is found
      if (!product) {
        next({
          name: "Not Found",
          message: `Error product with id: ${id} not found`,
        });
        return;
      }
      //update data
      if (req.user.role.toLowerCase() == "staff") {
        req.body.authorId = req.user.id; //assign body with current user
      } else {
        req.body.authorId = product.authorId;
      }

      let updatedProduct = await product.update(req.body, {
        individualHooks: false, //if want to use hooks after update, change to true
      });
      res.status(200).json({
        message: `Successfully Update Product with ID: ${id}`,
        product: updatedProduct,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ editProduct ~ error:", error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);

      //check if data is found
      if (!product) {
        next({
          name: "Not Found",
          message: `Error product with id: ${id} not found`,
        });
        return;
      }
      const deletedProductName = product.name;
      //update data
      await product.destroy();
      res.status(200).json({
        message: `${deletedProductName} success to delete`,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ deleteProduct ~ error:", error);
      next(error);
    }
  }

  static async changeImageUrl(req, res, next) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);
      //check if data is found
      if (!product) {
        next({
          name: "Not Found",
          message: `Error product with id: ${id} not found`,
        });
        return;
      }

      if (!req.file) {
        next({
          name: "Validation Error",
          message: `Please Insert Image`,
        });
        return;
      }

      let fileUpload = await convertImgToString(req.file);
      let { secure_url } = await uploadFile(fileUpload, req.file.originalname);

      //update data
      let updatedProduct = await product.update(
        { imgUrl: secure_url },
        {
          individualHooks: false, //if want to use hooks after update, change to true
        }
      );
      res.status(200).json({
        message: `Image ${product.name} success to update`,
        product: updatedProduct,
      });
    } catch (error) {
      console.log("🚀 ~ ProductController ~ changeImageUrl ~ error:", error);
      next(error);
    }
  }
}

module.exports = ProductController;
