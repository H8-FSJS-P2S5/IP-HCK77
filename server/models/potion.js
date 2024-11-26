"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Potion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Potion.belongsTo(models.Genre);
      Potion.belongsTo(models.Cauldron);
    }
  }
  Potion.init(
    {
      recommendation: { type: DataTypes.STRING, defaultValue: "" },
      GenreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "GenreId is required" },
          notNull: { msg: "GenreId is required" },
        },
      },
      CauldronId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Potion",
    }
  );
  return Potion;
};
