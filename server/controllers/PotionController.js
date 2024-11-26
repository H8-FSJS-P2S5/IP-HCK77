const { Potion, Cauldron } = require("../models");

class PotionController {
  static async createPotion(req, res, next) {
    try {
      const { cauldronId } = req.params;
      const cauldron = await Cauldron.findByPk(cauldronId);
      if (!cauldron) {
        next({
          name: "Not Found",
          message: "Cauldron not found",
        });
        return;
      }
      req.body.UserId = req.user.id;
      req.body.CauldronId = cauldronId;
      let newPotion = await Potion.create(req.body);
      res.status(201).json({
        id: newPotion.id,
        recommendation: newPotion.recommendation,
        GenreId: newPotion.GenreId,
        CauldronId: newPotion.CauldronId,
      });
    } catch (error) {
      console.log("🚀 ~ PotionController ~ createPotion ~ error:", error);
      next(error);
    }
  }

  static async updatePotion(req, res, next) {
    try {
      let { potionId } = req.params;
      let potion = await Potion.findByPk(potionId);

      //check if potion is found
      if (!potion) {
        next({
          name: "Not Found",
          message: `Error potion with ID: ${potionId} not found`,
        });
        return;
      }

      await potion.update(req.body);
      res.status(200).json({
        message: `Successfully update potion with ID: ${potionId}`,
      });
    } catch (error) {
      console.log("🚀 ~ PotionController ~ updatePotion ~ error:", error);
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
}

module.exports = PotionController;

// static async showProducts(req, res, next) {
//   try {
//     let option = {
//       include: [
//         {
//           model: User,
//           attributes: { exclude: ["password"] },
//         },
//         {
//           model: Category,
//         },
//       ],
//       order: [["createdAt", "ASC"]],
//     };
//     const { filter, sort, page, search } = req.query;

//     //read pagination in sequelize docs
//     let limit = 10;
//     let pageNumber = 1;
//     if (page) {
//       option = paginationOption(page, option);
//       limit = page.size ? page.size : limit;
//       pageNumber = page.number ? page.number : pageNumber;
//     }

//     if (sort) {
//       //can be use link this in route /products?sort[by]=createdAt&sort[order]=asc
//       option = sortOption(sort, option);
//     }

//     if (search) {
//       option = searchOption(search, option);
//     }
//     if (filter) {
//       option = filterOption(filter, option);
//     }

//     let { count, rows } = await Product.findAndCountAll(option);
//     res.status(200).json({
//       message: "Successfully Display Products",
//       page: +pageNumber,
//       totalProduct: +count,
//       totalPage: Math.ceil(count / limit), //data length divided with limit each page, to know page number. using ciel cause if minimum page quantity is 1
//       products: rows,
//     });
//   } catch (error) {
//     console.log("🚀 ~ ProductController ~ showProducts ~ error:", error);
//     next(error);
//   }
// }

// static async showProductById(req, res, next) {
//   try {
//     let { id } = req.params;
//     let product = await Product.findByPk(id);
//     if (!product) {
//       next({
//         name: "Not Found",
//         message: `Error product with ID: ${id} not found`,
//       });
//       return;
//     }

//     res.status(200).json({
//       message: "Successfully Display Product",
//       product,
//     });
//   } catch (error) {
//     console.log("🚀 ~ ProductController ~ showProductById ~ error:", error);
//     next(error);
//   }
// }

// static async changeImageUrl(req, res, next) {
//   try {
//     let { id } = req.params;
//     let product = await Product.findByPk(id);
//     //check if data is found
//     if (!product) {
//       next({
//         name: "Not Found",
//         message: `Error product with id: ${id} not found`,
//       });
//       return;
//     }

//     if (!req.file) {
//       next({
//         name: "Validation Error",
//         message: `Please Insert Image`,
//       });
//       return;
//     }

//     let fileUpload = await convertImgToString(req.file);
//     let { secure_url } = await uploadFile(fileUpload, req.file.originalname);

//     //update data
//     let updatedProduct = await product.update(
//       { imgUrl: secure_url },
//       {
//         individualHooks: false, //if want to use hooks after update, change to true
//       }
//     );
//     res.status(200).json({
//       message: `Image ${product.name} success to update`,
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.log("🚀 ~ ProductController ~ changeImageUrl ~ error:", error);
//     next(error);
//   }
// }
