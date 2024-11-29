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

let userLogin = {
  email: "new@gmail.com",
  password: "123456",
};

describe("Register", () => {
  test("success register account", async () => {
    const response = await request(app).post("/register").send(userLogin);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.email).toBe("new@gmail.com");
  });

  test("error register because not input email", async () => {
    let { ...userBadRequest } = userLogin;
    delete userBadRequest.email;
    // console.log(userBadRequest);
    const response = await request(app).post("/register").send(userBadRequest);
    expect(response.status).toBe(400);
    // console.log(response);
    expect(response.body.message).toBe("Email is required");
  });

  test("error register because email format invalid", async () => {
    let { ...userBadRequest } = userLogin;
    userBadRequest.email = "aaaa";
    // console.log(userBadRequest);
    const response = await request(app).post("/register").send(userBadRequest);
    expect(response.status).toBe(400);
    // console.log(response);
    expect(response.body.message).toBe("Invalid email format");
  });

  test("error register because not input password", async () => {
    let { ...userBadRequest } = userLogin;
    delete userBadRequest.password;
    // console.log(userBadRequest);
    const response = await request(app).post("/register").send(userBadRequest);
    expect(response.status).toBe(400);
    // console.log(response.body);
    expect(response.body.message).toBe("Password is required");
  });

  test("error register because duplicate email", async () => {
    let { ...userBadRequest } = userLogin;
    userBadRequest.email = "admin@gmail.com";
    const response = await request(app).post("/register").send(userBadRequest);
    expect(response.status).toBe(400);
    // console.log(response);
    expect(response.body.message).toBe("Email must be unique");
  });
});
