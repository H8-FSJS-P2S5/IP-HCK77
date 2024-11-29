"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Potions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      recommendation: {
        type: Sequelize.TEXT,
      },
      GenreId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Genres",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      CauldronId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cauldrons",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Potions");
  },
};
