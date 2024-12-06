"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Game.hasMany(models.MyList, { foreignKey: "GameId" });
        }
    }
    Game.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Name is required",
                    },
                    notNull: {
                        msg: "Name is required",
                    },
                },
            },
            released: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Release year is required",
                    },
                    notNull: {
                        msg: "Release year is required",
                    },
                },
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Image is required",
                    },
                    notNull: {
                        msg: "Image is required",
                    },
                },
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Rating is required",
                    },
                    notNull: {
                        msg: "Rating is required",
                    },
                },
            },
            genres: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Genre is required",
                    },
                    notNull: {
                        msg: "Genre is required",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Game",
        }
    );
    return Game;
};
