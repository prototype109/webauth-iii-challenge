const User = require("../data/dbConfig");

module.exports = {
  addUser,
  getUser
};

function addUser(user) {
  return User("users").insert(user);
}

function getUser(user) {
  return User("users").where("username", user);
}
