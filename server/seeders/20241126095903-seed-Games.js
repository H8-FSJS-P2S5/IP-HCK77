"use strict";

const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { data } = await axios.get(
            "https://api.rawg.io/api/games?key=752b414c40f749e1ba6ebf14cb2e43b1"
        );
        // console.log(data);

        const games = data.results.map((game) => {
            // console.log(game.genres);

            return {
                name: game.name,
                released: game.released,
                imageUrl: game.background_image,
                rating: game.rating,
                genres: game.genres.map((genre) => {
                //   console.log(genre.name);
                  return genre.name
                }).join(', '),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
        await queryInterface.bulkInsert("Games", games, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Games", null, {});
    },
};
