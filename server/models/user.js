"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.MyList, { foreignKey: "UserId" });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Email is required",
                    },
                    notNull: {
                        msg: "Email is required",
                    },
                    isEmail: {
                        args: true,
                        msg: "Check Email Format"
                    }
                    ,
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
