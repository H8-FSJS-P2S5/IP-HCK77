const {
    test,
    expect,
    beforeAll,
    afterAll,
    describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { sequelize, User, MyList, Game } = require("../models");
const { signToken } = require("../helpers/jwt");
const { where } = require("sequelize");
const { queryInterface } = sequelize;

let access_token;

beforeAll(async () => {
    console.log("Before All");
    let users = [
        {
            email: "test@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    let games = [
        {
            id: 1,
            name: "Grand Theft Auto V",
            released: "2013-09-17",
            imageUrl:
                "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
            rating: 4,
            genres: "Action",
            createdAt: "2024-11-27T00:47:01.523Z",
            updatedAt: "2024-11-27T00:47:01.523Z",
        },
        {
            id: 2,
            name: "The Witcher 3: Wild Hunt",
            released: "2015-05-18",
            imageUrl:
                "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
            rating: 5,
            genres: "Action, RPG",
            createdAt: "2024-11-27T00:47:01.524Z",
            updatedAt: "2024-11-27T00:47:01.524Z",
        },
        {
            id: 3,
            name: "Portal 2",
            released: "2011-04-18",
            imageUrl:
                "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
            rating: 5,
            genres: "Shooter, Puzzle",
            createdAt: "2024-11-27T00:47:01.524Z",
            updatedAt: "2024-11-27T00:47:01.524Z",
        },
    ];

    let myList = [
        {
            id: 1,
            UserId: 1,
            GameId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await sequelize.queryInterface.bulkInsert("Users", users);
    await sequelize.queryInterface.bulkInsert("Games", games);
    await sequelize.queryInterface.bulkInsert("MyLists", myList);

    const user = await User.findOne({
        where: {
            email: "test@email.com",
        },
    });
    access_token = signToken({ id: user.id });
});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });

    await Game.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });

    await MyList.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});

test("GET /games", async () => {
    console.log("Get Games");
    const response = await request(app).get("/games");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
});

test("GET /myList", async () => {
    console.log("Get MyList");
    const response = await request(app)
        .get("/myList")
        .set("Authorization", `Bearer ${access_token}`);

    // console.log(response.body, "<<<<");

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("GameId", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("UserId", expect.any(Number));
});
