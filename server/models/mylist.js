"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MyList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MyList.belongsTo(models.User, { foreignKey: "UserId" });
            MyList.belongsTo(models.Game, { foreignKey: "GameId" });
        }
    }
    MyList.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "User is required",
                    },
                    notNull: {
                        msg: "User is required",
                    },
                },
            },
            GameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Game is required",
                    },
                    notNull: {
                        msg: "Game is required",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "MyList",
        }
    );
    return MyList;
};
