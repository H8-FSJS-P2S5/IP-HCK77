const geminiPrompt = require("./geminiConfig");
const getTopMangaByGenre = require("./getTopMangaByGenre");

const generateRecommendation = async (synopsis, genre) => {
  const mangaByGenre = await getTopMangaByGenre(genre);
  const prompt = `
      Analyze
      ${
        typeof mangaByGenre == "object"
          ? `the following top-ranking ${genre.name} manga synopses: ${mangaByGenre} also `
          : ``
      }
      current grossing ${genre.name} manga synopses
    
      Based on your analysis, 
      ${
        synopsis
          ? `please improve my synopsis ${synopsis}`
          : `generate a unique and creative synopsis`
      }
        for a new ${genre.name} manga.

      This synopsis should:
        Incorporate popular ${
          genre.name
        } manga tropes while avoiding direct plagiarism.
        Introduce a fresh and original protagonist with compelling motivations.
        Develop a captivating world-building with unique settings and lore.
        Present a high-stakes conflict that drives the narrative forward.
        Maintain a balance of action, drama and character development.
        Please format your response as a single paragraph synopsis.
    `;
  let result = await geminiPrompt(prompt);
  return JSON.parse(result.response.text());
};

module.exports = generateRecommendation;
