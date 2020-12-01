const { Users } = require('../models');

//  Email validations ---------------------------------------------------------
const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: 'Email is required!' });
  }

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Email is not allowed to be empty!' });
  }
  return next();
};

//  Password validations ------------------------------------------------------
const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: 'Password is required!' });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: 'Password is not allowed to be empty!' });
  }

  return next();
};

//  User exists? --------------------------------------------------------------
const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'User not found...' });
  }

  return next();
};

module.exports = { validateEmail, validatePassword, validateUser };
