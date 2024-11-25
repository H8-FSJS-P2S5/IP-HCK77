if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
// const router = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //error because of not invoked

app.get("/", (req, res) => {
  res.json("hello");
});

module.exports = app;
