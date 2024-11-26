// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiPrompt = async (prompt = String) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = prompt;

  const result = await model.generateContent(prompt);
  return result;
};

module.exports = geminiPrompt;
