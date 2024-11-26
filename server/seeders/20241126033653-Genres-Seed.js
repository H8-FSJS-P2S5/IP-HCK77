"use strict";

const axios = require("axios").default;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios.get("https://api.jikan.moe/v4/genres/manga");
    let genres = response.data.data;
    console.log(genres);

    genres = genres.map((el) => {
      delete el.mal_id;
      delete el.count;
      delete el.url;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Genres", genres);
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
