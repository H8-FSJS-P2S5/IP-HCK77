"use strict";

const axios = require("axios").default;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios.get("https://api.jikan.moe/v4/genres/manga");
    let genres = response.data.data;

    genres = genres.map((el) => {
      delete el.mal_id;
      delete el.count;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Genres", genres);

    let cauldrons = [
      {
        name: "Dragon Cauldron",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let profiles = [
      {
        fullName: "admin",
        profilePicture:
          "https://images.pexels.com/photos/6129297/pexels-photo-6129297.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Profiles", profiles);
    await queryInterface.bulkInsert("Cauldrons", cauldrons);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
