const { Game } = require("../models");


module.exports = class GameController {
    static async getGames(req, res, next) {
        try {
            const games = await Game.findAll();
            res.status(200).json(games);
        } catch (err) {
            console.log("🚀 ~ getCategory ~ err:", err);
            next(err);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params
            const games = await Game.findByPk(id);
            res.status(200).json(games);
        } catch (err) {
            console.log("🚀 ~ getCategory ~ err:", err);
            next(err);
        }
    }
};
