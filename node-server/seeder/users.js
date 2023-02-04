const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

const users = [
  {
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("63d80247f1de4bffbc81a95e"),
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("john@doe.com", 10),
  },
];

module.exports = users;
