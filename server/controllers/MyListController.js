const { MyList } = require("../models");
const { Game } = require("../models");
const { User } = require("../models");

module.exports = class MyListController {
    static async getMyList(req, res, next) {
        try {
            const UserId = req.user.id;
            const myList = await MyList.findAll({
                where: { UserId },
                include: [{ model: Game }],
            });
            res.status(200).json({ data: myList });
        } catch (error) {
            next(error);
        }
    }

    static async addMyList(req, res, next) {
        try {
            const { GameId } = req.body;
            const UserId = req.user.id;
            // console.log({ gameId });

            const gameExists = await Game.findByPk(GameId);
            if (!gameExists) {
                next({
                    name: "NotFound",
                    message: "Game not found",
                });
                return
            }

            const exists = await MyList.findOne({ where: { UserId, GameId } });
            if (exists) {
                next({
                    name: "BadRequest",
                    message: "Game already in list",
                });
                return
            }

            const myList = await MyList.create({ UserId, GameId });
            res.status(201).json({ data: myList });
        } catch (error) {
            next(error);
        }
    }

    static async updateMyList(req, res, next) {
        try {
            req.body.userId = req.user.id;
            const { id } = req.params;
            // const updateData = req.body;
            const myList = await MyList.findByPk(id);
            if (!myList) {
                next({
                    name: "NotFound",
                    message: "My list not found",
                });
                return
            }

            await myList.update(req.body, {
                individualHooks: true,
            });

            res.status(200).json({
                data: myList,
                message: `Game ${myList.name} updated`,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteMyList(req, res, next) {
        try {
            const { id } = req.params;
            const myList = await MyList.findByPk(id);

            if (!myList) {
                next({
                    name: "NotFound",
                    message: `MyList id:${id} not found`,
                });
                return
            }

            await myList.destroy();
            res.status(200).json({
                message: `Game ${id} success to removed`,
            });
        } catch (error) {
            next(error);
        }
    }
};
