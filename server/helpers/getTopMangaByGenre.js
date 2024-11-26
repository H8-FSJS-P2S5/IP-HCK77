const axios = require("axios");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTopMangaByGenre = async (input) => {
  let IsNotFound = true;
  let filteredMangas = [];
  let page = 1;
  while (page <= 10 || IsNotFound) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/manga?filter=bypopularity&&type=manga&&page=${page}`
      );
      const mangas = response.data.data;

      filteredMangas = mangas.filter((manga) =>
        manga.genres.some(
          (genre) => genre.name.toLowerCase() == input.toLowerCase()
        )
      );
      IsNotFound = !filteredMangas.some((manga) =>
        manga.genres.some(
          (genre) => genre.name.toLowerCase() === input.toLowerCase()
        )
      );
      if (!filteredMangas.length) {
        break;
      }

      page++;
      console.log(page);

      //create delay to respect API rate limit
      await delay(1000);
    } catch (error) {
      console.log("🚀 ~ getTopMangaByGenre ~ error:", error);
    }
  }

  filteredMangas = filteredMangas.map((manga) => ({
    title: manga.title,
    synopsis: manga.synopsis,
  }));

  return filteredMangas || "No manga found for this genre";
};
module.exports = getTopMangaByGenre;
