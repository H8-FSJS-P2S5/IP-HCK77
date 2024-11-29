const { where } = require("sequelize");
const { comparePassword } = require("../helpers/hashPassword");
const { generateToken } = require("../helpers/token");
const { User, Profile, Cauldron } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const {
  mailOptions,
  sendVerification,
} = require("../helpers/emailVerification");

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
      const { email, given_name, picture } = payload;
      let [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email: payload.email,
          password: String(Math.random() * 100),
          isVerified: false,
        },
        hooks: false,
      });

      if (created) {
        console.log("send mail");
        //send verification email
        let emailVerification = mailOptions(email);
        sendVerification(emailVerification);
      }
      let profile = await Profile.findOne({
        where: { UserId: user.id },
      });
      if (!profile) {
        profile = await Profile.create({
          fullName: given_name,
          profilePicture: picture,
          UserId: user.id,
        });
      }
      console.log("profile", profile);

      let cauldron = await Cauldron.findOne({
        where: { UserId: user.id },
      });
      if (!cauldron) {
        cauldron = await Cauldron.create({
          name: `${given_name} Cauldron`,
          UserId: user.id,
        });
      }
      console.log("cauldron", cauldron);

      const access_token = generateToken(user.id);

      res.status(created ? 201 : 200).json({
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ UserController ~ loginGoogle ~ error:", error);
      next(error);
    }
  }
  static async verify(req, res) {
    try {
      const { email } = req.params;
      let user = await User.findOne({ where: { email } });
      user.update({ isVerified: true });
      res.status(200).json({
        message: "Email verification success ",
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = UserController;
