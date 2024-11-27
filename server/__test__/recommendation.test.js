const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/token");
const { hashPassword } = require("../helpers/hashPassword");
const { sequelize, User, Genre } = require("../models");

let users = [
  {
    email: "admin@gmail.com",
    password: hashPassword("123456"),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let genres = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Romance" },
  { name: "Comedy" },
  { name: "Drama" },
];
genres = genres.map((el) => {
  el.createdAt = el.updatedAt = new Date();
  return el;
});

let token;

beforeAll(async () => {
  try {
    await sequelize.queryInterface.bulkInsert("Users", users);
    await sequelize.queryInterface.bulkInsert("Genres", genres);
    const user = await User.findOne({ where: { email: "admin@gmail.com" } });
    token = generateToken(user.id);
  } catch (error) {
    console.log("🚀 ~ beforeAll ~ error:", error);
  }
});

afterAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await Genre.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  } catch (error) {
    console.log("🚀 ~ afterAll ~ error:", error);
  }
});

let input = {
  synopsis: "A fat guy that thrive in war zone with his smart band",
  GenreId: 1,
};

describe("Generate Recommendation", () => {
  test("success generate recommendation", async () => {
    const response = await request(app).post("/recommendation").send(input);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("recommendation", expect.any(String));
  });

  test("error generate recommendation because not input GenreId", async () => {
    let { ...userInput } = input;
    delete userInput.GenreId;
    const response = await request(app).post("/recommendation").send(userInput);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("GenreId is required");
  });
});
