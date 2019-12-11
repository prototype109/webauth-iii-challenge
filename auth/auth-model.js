const User = require("../data/dbConfig");

module.exports = {
  addUser,
  getUser,
  getUsers
};

function addUser(user) {
  return User("user").insert(user);
}

function getUser(user) {
  return User("user").where("username", user);
}

function getUsers() {
  return User("user");
}
