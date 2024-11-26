const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/token");
const { hashPassword } = require("../helpers/hashPassword");
const { sequelize, User, Genre, Cauldron, Profile } = require("../models");

let users = [
  {
    email: "admin@gmail.com",
    password: hashPassword("123456"),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let cauldrons = [
  {
    name: "Dragon Cauldron",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let profiles = [
  {
    fullName: "admin",
    UserId: 1,
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
    await sequelize.queryInterface.bulkInsert("Profiles", profiles);
    await sequelize.queryInterface.bulkInsert("Cauldrons", cauldrons);
    const user = await User.findOne({ where: { email: "admin@gmail.com" } });
    token = generateToken(user.id);
    // token = access_token;
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
    await Profile.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await Cauldron.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  } catch (error) {
    console.log("🚀 ~ afterAll ~ error:", error);
  }
});

describe("Update Cauldron By Id", () => {
  let cauldron = {
    name: "Flying Dutchman",
  };
  test("success update cauldron", async () => {
    const response = await request(app)
      .put("/cauldrons/1")
      .set("Authorization", `Bearer ${token}`)
      .send(cauldron);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully update cauldron");
  });
});
