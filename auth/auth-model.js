const User = require("../data/dbConfig");

module.exports = {
  addUser
};

function addUser(user) {
  return User("users").insert(user);
}
