const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./auth-model");
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret");
const restricted = require("./restricted-middleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  password = hash;

  try {
    const user = await db.addUser({ username: username, password: password });
    if (user.length) {
      res.status(200).json({ message: "successfully registered user" });
    } else {
      res.status(400).json({ message: "invalid username or password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.getUser(username);
    if (user.length && bcrypt.compareSync(password, user[0].password)) {
      const token = generateToken(user[0]);
      req.headers.authorization = token;
      res.status(200).json({ message: "successfully logged in", token: token });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/users", restricted, async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
