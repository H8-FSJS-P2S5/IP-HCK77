const geminiPrompt = require("../helpers/geminiPrompt");
const getTopMangaByGenre = require("../helpers/getTopMangaByGenre");
const { Genre } = require("../models");

class GenreController {
  static async showGenres(req, res, next) {
    try {
      let genres = await Genre.findAll({ limit: 5 });
      genres = genres.map((genre) => {
        const prompt = `
        Analyze the following top-ranking ${genre.name} manga synopses:
        ${getTopMangaByGenre(genre.name)}
  
        Based on your analysis, generate a unique and creative synopsis for a new ${
          genre.name
        } manga. 
        
        This synopsis should:
          Incorporate popular ${
            genre.name
          } manga tropes while avoiding direct plagiarism.
          Introduce a fresh and original protagonist with compelling motivations.
          Develop a captivating world-building with unique settings and lore.
          Present a high-stakes conflict that drives the narrative forward.
          Maintain a balance of ${genre.name} and character development.
          Please format your response as a single paragraph synopsis.
      `;
        let result = null;
        (async () => {
          result = await geminiPrompt(prompt);
        })();
        console.log(result);
        result = JSON.parse(result.response.text());
        genre.recommendation = result;
        return genre;
      });
      res.status(200).json({
        genres,
      });
    } catch (error) {
      console.log("🚀 ~ GenreController ~ showGenres ~ error:", error);
      next(error);
    }
  }
}

module.exports = GenreController;
