const { where } = require("sequelize");
const { comparePassword } = require("../helpers/hashPassword");
const { generateToken } = require("../helpers/token");
const { User, Profile, Cauldron } = require("../models");
const { OAuth2Client } = require("google-auth-library");

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
      // console.log("google.auth");
      const client = new OAuth2Client();
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        // we use our client_id from the Google console
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email } = payload;
      let [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email: payload.email,
          password: String(Math.random() * 100),
        },
        hooks: false,
      });
      console.log(user);
      await Profile.findOrCreate({
        where: { UserId: user.id },
        default: {
          name: payload.name,
          profilePicture: payload.picture,
          UserId: user.id,
        },
      });
      await Cauldron.findOrCreate({
        where: { UserId: user.id },
        default: { UserId: user.id },
      });
      const access_token = generateToken(user.id);

      res.status(created ? 201 : 200).json({
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ UserController ~ loginGoogle ~ error:", error);
      next(error);
    }
  }
}
module.exports = UserController;
