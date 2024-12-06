const { Hooks } = require("sequelize/lib/hooks");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");
const { OAuth2Client } = require("google-auth-library");

class UserController {
    static async register(req, res) {
        try {
            const { email } = req.body;

            const newUser = await User.create({
                email,
            });

            res.status(201).json({
                id: newUser.id,
                email: newUser.email,
            });
        } catch (err) {
            // console.log(err, "<<< ERROR");
            if (
                err.name === "SequelizeUniqueConstraintError" ||
                err.name === "SequelizeValidationError"
            ) {
                res.status(400).json({
                    message: err.errors[0].message,
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        }
    }

    static async login(req, res) {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                res.status(401).json({ message: "Invalid Email" });
                return;
            }

            const access_token = signToken({ id: user.id });

            res.status(200).json({
                access_token,
            });
        } catch (err) {
            // console.log(err, "<<< ERROR");
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { googletoken } = req.headers
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: googletoken,
                audience:
                    process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const { email } = payload;
            console.log(payload, "<--- payload dari google");

            let user = await User.findOne({ where: { email } });

            if (!user) {
                user = await User.create({ email });
            }

            const access_token = signToken({ id: user.id });
            res.status(200).json({
                access_token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
