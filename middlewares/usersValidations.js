const { Users } = require('../models');

//  Name validation -----------------------------------------------------------
const validateName = async (req, res, next) => {
  const { username } = req.body;

  if (username.length < 6) {
    return res.status(400).json({
      message: 'Username length must be at least 6 characters long!',
    });
  }
  return next();
};

//  Password validation -------------------------------------------------------
const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required!' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({
        message: 'Password length must be at least 6 characters long!',
      });
  }

  return next();
};

//  Email validation ----------------------------------------------------------
const validateEmail = async (req, res, next) => {
  const emailRegex = /\S+@\S+\.\S+/;

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required!' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please use a valid email!' });
  }

  return next();
};

//  Verify if email already exists ---------------------------------------------
const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'Email already registered!' });
  }

  return next();
};

//  Verify if user already exists ---------------------------------------------
const validateUserExists = async (req, res, next) => {
  const { username } = req.body;

  const user = await Users.findOne({ where: { username } });
  if (user) {
    return res.status(409).json({ message: 'Username already registered!' });
  }

  return next();
};

module.exports = {
  validateName,
  validatePassword,
  validateEmail,
  validateEmailExists,
  validateUserExists,
};
