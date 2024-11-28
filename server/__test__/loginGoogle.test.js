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

let googleToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2MjgyNTg2MDExMTNlNjU3NmE0NTMzNzM2NWZlOGI4OTczZDE2NzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxODg5MDIxOTQxMjgtaWY4b2RwOHMxbzY2dGI3Y2EyY2szZDdsbmV1amYycDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxODg5MDIxOTQxMjgtaWY4b2RwOHMxbzY2dGI3Y2EyY2szZDdsbmV1amYycDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIyNDQ5OTg4NzE2OTIzOTA0NTIiLCJlbWFpbCI6ImZhdXpoYW53YWh5dWRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzI3ODg2NzUsIm5hbWUiOiJGYXV6aGFuIFdhaHl1ZGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHVoa2RKTHh6VWdIZkZVa2kyWjRMZDl0UmVCTGZyUHJRU2FFaXZWd2lKTzlpZkFRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZhdXpoYW4gV2FoeXVkaSIsImlhdCI6MTczMjc4ODk3NSwiZXhwIjoxNzMyNzkyNTc1LCJqdGkiOiIyMDFkNTBlNmQ1MWU3YjAxZjE3Y2UzMDFmZWEyZjFmYjdjNjQ1MjI1In0.TojSfhT9ShPG-nAsKQVOlF2FRN0y6ShH-7DUcWZOQG8xYVF1hFeUUFg4ZTzpeV1xZzt22mcgy-i05zgxuoH8sBZU3xmAtAYtb9dJPm2_I28borDgxdErMoVVhwNKDSeujvndP0I1j-nwskqaLdWgsF7Iy5FrJtdmOeW1_nO0meXGu92H9j0t67eTpJUOEwkqOf2Orb5f4wX3B_sHDwux2A3ZQs4SppvPnpZwg2Wv4L0jEDaGn5QeuneibIVtjZZJ7zfSKIN7xXOYpWQbpyg1hQDnuVzZoVmGYPNuS8L8b2v2jUMQ0NFJQ4B8Vz1s7yUIxGwygJAjwSrddWS6pqD7JQ";

describe("Login with Google account", () => {
  test("success login account if not registered", async () => {
    const response = await request(app)
      .post("/auth/google")
      .send({ googleToken });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  test("success login account if have registered", async () => {
    const response = await request(app)
      .post("/auth/google")
      .send({ googleToken });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});
