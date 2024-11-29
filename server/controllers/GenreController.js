const { Genre } = require("../models");

class GenreController {
  static async showGenres(req, res, next) {
    try {
      let genres = await Genre.findAll();
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
