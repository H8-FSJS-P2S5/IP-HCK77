const { comparePassword } = require("../helpers/auth");
const { generateToken } = require("../helpers/jwtGenerator");
const { User } = require("../models");

class Controller {
  static async home(req, res, next) {
    try {
      res.status(200).json({ message: "Access Success" });
      // res.redirect("https://fauzhanwahyudi.github.io/profile/index.html");
    } catch (error) {
      console.log("🚀 ~ ProductController ~ home ~ error:", error);
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        message: `Successfully Register ${newUser.username}`,
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log("🚀 ~ Controller ~ addUser ~ error:", error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = null;
      if (email) {
        user = await User.findOne({ where: { email } });
      } else {
        next({
          name: "Validation Error",
          message: "Email is required",
        });
        return;
      }

      if (!password) {
        next({
          name: "Validation Error",
          message: "Password is required",
        });
      }

      if (!user) {
        next({
          name: "Authentication Failed",
          message: "Error invalid email or username or password",
        });
        return;
      }

      const isValidate = comparePassword(password, user.password);

      if (!isValidate) {
        next({
          name: "Authentication Failed",
          message: "Error invalid email or username or password",
        });
        return;
      }

      const access_token = generateToken(user.id);

      res.status(200).json({
        access_token,
        message: `${user.username ? user.username : user.email} login success`,
      });
    } catch (error) {
      console.log("🚀 ~ Controller ~ login ~ error:", error);
      next(error);
    }
  }
}
module.exports = Controller;
