const axios = require("axios");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTopMangaByGenre = async (input) => {
  let foundManga = {};
  let page = 1;
  while (page <= 10) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/manga?filter=bypopularity&&type=manga&&page=${page}`
      );
      const mangas = response.data.data;

      foundManga = mangas.find((manga) =>
        manga.genres.some(
          (genre) => genre.name.toLowerCase() == input.toLowerCase()
        )
      );

      if (foundManga) {
        break;
      }

      page++;
      //create delay to respect API rate limit
      await delay(2000);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit reached. Retrying...");
        await delay(2000);
      } else {
        console.log("🚀 ~ getTopMangaByGenre ~ error:", error);
        break;
      }
    }
  }

  if (foundManga) {
    foundManga = {
      title: foundManga.title,
      synopsis: foundManga.synopsis,
    };
  }

  return foundManga || "No manga found for this genre";
};

module.exports = getTopMangaByGenre;
