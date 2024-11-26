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
    profilePicture:
      "https://images.pexels.com/photos/6129297/pexels-photo-6129297.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
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

describe("create Potion", () => {
  //   console.log(token, "TOKEN===========");
  let potion = {
    recommendation:
      "In a world ravaged by celestial wars, a disgraced Rune Knight, Kael, haunted by the death of his family, discovers a hidden prophecy foretelling the birth of a child who will either save or destroy their fractured world.  This child is the offspring of Kael and a vengeful, ancient spirit, bound to him through a mystical pact.  Forced to raise this powerful, volatile infant while battling the remnants of the celestial armies and a conspiracy that seeks to exploit the child's immense power, Kael must confront his past traumas and forge unlikely alliances to ensure her survival and the fate of their world.  Guided by a mysterious, sentient cheat-system imbued with forgotten magic, he juggles fatherhood, epic battles, and unraveling the truth of the celestial wars, all while struggling to protect his daughter from those who crave her power.  Their journey is a tumultuous blend of action, heart-wrenching drama, and unexpected tenderness, as Kael rediscovers hope and learns the true meaning of family.",
    GenreId: 1,
  };
  test("success create potion", async () => {
    const response = await request(app)
      .post("/cauldrons/1/potions")
      .set("Authorization", `Bearer ${token}`)
      .send(potion);
    // console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("recommendation", expect.any(String));
  });

  test("error create potion because cauldron not found", async () => {
    const response = await request(app)
      .post("/cauldrons/1000/potions")
      .set("Authorization", `Bearer ${token}`)
      .send(potion);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Cauldron not found");
  });

  test("error unauthorized", async () => {
    const response = await request(app)
      .post("/cauldrons/1000/potions")
      .set("Authorization", `Bearer ${token}1`)
      .send(potion);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});
