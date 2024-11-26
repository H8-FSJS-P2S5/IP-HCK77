"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cauldron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cauldron.belongsTo(models.User);
    }
  }
  Cauldron.init(
    {
      name: { type: DataTypes.STRING, defaultValue: "New Cauldron" },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cauldron",
    }
  );
  return Cauldron;
};
