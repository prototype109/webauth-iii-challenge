const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./auth-model");
const router = express.Router();

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  password = hash;

  try {
    const user = await db.addUser({ username, password });
    if (user.length) {
      res.status(200).json({ message: "successfully registered user" });
    } else {
      res.status(400).json({ message: "invalid username or password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
