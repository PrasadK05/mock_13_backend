require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createUser,
  validateUser,
  findUser,
} = require("../controllers/user.controllers");
const User = require("../models/user.model");

const token_secret = process.env.TOKEN_KEY;
const refreshToken_secret = process.env.REFRESHTOKEN_KEY;

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email, password, name, role } = req.body;
  let user;
  if (email.includes("@masaischool.com")) {
    user = await createUser({ email, password, name, role: "admin" });
  } else {
    user = await createUser({ email, password, name, role });
  }

  if (user) {
    return res.send({ status: true, messege: "user created successfully" });
  } else {
    return res.send({ status: false, messege: "wrong details" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await validateUser({ email, password });
  if (user) {
    let token = jwt.sign(
      { email: user.email, name: user.name, role: user.role },
      token_secret,
      {
        expiresIn: "24 hr",
      }
    );
    let refreshToken = jwt.sign(
      { email: user.email, name: user.name, role: user.role },
      refreshToken_secret,
      {
        expiresIn: "7 days",
      }
    );
    return res.send({ status: true, token, refreshToken });
  } else {
    return res.send({ status: false, messege: "wrong details" });
  }
});

module.exports = app;
