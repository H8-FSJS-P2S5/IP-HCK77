const { where } = require("sequelize");
const { comparePassword } = require("../helpers/hashPassword");
const { generateToken } = require("../helpers/token");
const { User, Profile, Cauldron } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const newUser = await User.create(req.body);
      await Profile.create({ UserId: newUser.id });
      await Cauldron.create({ UserId: newUser.id });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log("🚀 ~ Controller ~ register ~ error:", error);
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
          message: "Invalid email/password",
        });
        return;
      }

      const isValidate = comparePassword(password, user.password);

      if (!isValidate) {
        next({
          name: "Authentication Failed",
          message: "Invalid email/password",
        });
        return;
      }

      const access_token = generateToken(user.id);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ Controller ~ login ~ error:", error);
      next(error);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        next({
          name: "Validation Error",
          message: "Email is required",
        });
        return;
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create(
          {
            email,
            password: String(Math.random() * 100),
          },
          { hooks: false }
        );
      }
      const access_token = generateToken(user.id);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ UserController ~ loginGoogle ~ error:", error);
      next(error);
    }
  }
}
module.exports = UserController;
