const generateRecommendation = require("../helpers/recommendationPrompt");
const { Genre } = require("../models");

class RecommendationController {
  static async getRecommendation(req, res, next) {
    try {
      const { synopsis, genre } = req.body;
      if (!genre) {
        throw { name: "Validation Error", message: "Genre is required" };
      }
      let recommendation = await generateRecommendation(synopsis, genre);
      res.status(201).json({
        recommendation,
      });
    } catch (error) {
      console.log("🚀 ~ RecommendationController ~ showGenres ~ error:", error);
      next(error);
    }
  }
}

module.exports = RecommendationController;
