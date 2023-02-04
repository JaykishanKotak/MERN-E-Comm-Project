const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

//Genrate Hash form for password
const hashPassword = (password) => bcrypt.hashSync(password, salt);

//Compare Passwrod from request with the password stored in DB
const comparePasswords = (inputPassword, hashedPassword) =>
  bcrypt.compareSync(inputPassword, hashedPassword);

module.exports = { hashPassword, comparePasswords };
