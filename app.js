const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

require("./db/collection");
// const User = require('./model/userSchema')
app.use(express.json());

app.use(require("./router/auth"));

const port = process.env.PORT || 3000;

const middleware = (req, res, next) => {
  console.log("again and again");
  next();
};
app.get("/", (req, res) => {
  res.send("welcome to mernstack");
});

app.get("/about", middleware, (req, res) => {
  res.cookie("Test","again")
  res.send("welcome to About page of mernstack");
});

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
