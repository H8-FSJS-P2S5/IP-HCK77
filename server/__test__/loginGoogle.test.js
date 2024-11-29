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
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2MjgyNTg2MDExMTNlNjU3NmE0NTMzNzM2NWZlOGI4OTczZDE2NzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxODg5MDIxOTQxMjgtaWY4b2RwOHMxbzY2dGI3Y2EyY2szZDdsbmV1amYycDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxODg5MDIxOTQxMjgtaWY4b2RwOHMxbzY2dGI3Y2EyY2szZDdsbmV1amYycDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIyNDQ5OTg4NzE2OTIzOTA0NTIiLCJlbWFpbCI6ImZhdXpoYW53YWh5dWRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzI4MDExNTgsIm5hbWUiOiJGYXV6aGFuIFdhaHl1ZGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHVoa2RKTHh6VWdIZkZVa2kyWjRMZDl0UmVCTGZyUHJRU2FFaXZWd2lKTzlpZkFRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZhdXpoYW4gV2FoeXVkaSIsImlhdCI6MTczMjgwMTQ1OCwiZXhwIjoxNzMyODA1MDU4LCJqdGkiOiJkOGFmMzc0YWQ4NWU5NWY1NjJmMjM2Y2M5ODA2ZGFkNDMyNTdlMTFjIn0.XiKnO0wPj5WyKpcu-kgVucTnBVm90xN2lsr266EPc2ZYW1i2454rYDXFV-n7dJkw_0eVUWfnRrpoyaaaH01C70Or1AmUdtlR-21Y7BJq427hpKGOQNnKtwcqxioG1Y5iYeAduBPd0TzhstIziT827H7FOAkfxCyUWQELw4JqAAqYTjyj63ON2g_nw5oAFOh1Oe1e7Q7LlUQPclQOrzxQ_fyEzFFAjmIQi-tccQC5tjrgwpzRZ70Kc40bD7wroM_XpcLuR-6ssa-YyJYg46m9JNq46dGgxhkzVrmkhyvDmUihA5OFcCm6XM0B0AGGC_X-pkmgQbFzzvkAmOeYkNQcBw";

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
