const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/token");
const { hashPassword } = require("../helpers/hashPassword");
const {
  sequelize,
  User,
  Genre,
  Cauldron,
  Profile,
  Potion,
} = require("../models");

let users = [
  {
    email: "admin@gmail.com",
    password: hashPassword("123456"),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: "user@gmail.com",
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
  {
    name: "Gundam Cauldron",
    UserId: 2,
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
  {
    fullName: "user",
    UserId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let potions = [
  {
    recommendation: "potion1",
    GenreId: 1,
    CauldronId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    recommendation: "potion2",
    GenreId: 4,
    CauldronId: 2,
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
    await sequelize.queryInterface.bulkInsert("Potions", potions);
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
    await Potion.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  } catch (error) {
    console.log("🚀 ~ afterAll ~ error:", error);
  }
});

describe("Delete Potion By Id", () => {
  test("success delete potion", async () => {
    const response = await request(app)
      .delete("/cauldrons/1/potions/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully delete potion");
  });

  test("error delete cauldron because potion not found after delete", async () => {
    const response = await request(app)
      .delete("/cauldrons/1/potions/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Error potion with ID: 1 not found");
  });

  test("error delete potion because unauthorized", async () => {
    const response = await request(app)
      .delete("/cauldrons/2/potions/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe(`You have no access`);
  });

  test("error delete cauldron because potion not found", async () => {
    const response = await request(app)
      .delete("/cauldrons/1/potions/100")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Error potion with ID: 100 not found");
  });
});
