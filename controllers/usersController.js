const express = require('express');

const { Users } = require('../models');

const createToken = require('../auth/createToken');
const usersValidations = require('../middlewares/usersValidations');
const tokenValidation = require('../auth/tokenMiddleware');

const router = express.Router();

//  Create new user -----------------------------------------------------------
router.post(
  '/',
  usersValidations.validateName,
  usersValidations.validatePassword,
  usersValidations.validateEmail,
  usersValidations.validateEmailExists,
  usersValidations.validateUserExists,
  async (req, res) => {
    const { username, email, password } = req.body;

    await createToken({ email, password });

    await Users.create({ username, email, password });

    return res.status(201).json({ message: 'User successfully registered!' });
  },
);

//  Search all users ----------------------------------------------------------
router.get('/', tokenValidation, async (_req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
});

// Search user by PK ----------------------------------------------------------
router.get('/:id', tokenValidation, async (req, res) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }
  return res.status(200).json(user);
});

// Delete user ----------------------------------------------------------------
router.delete('/me', tokenValidation, async (req, res) => {
  const { email } = req.user;
  await Users.destroy({ where: { email } });

  return res.status(204).json({ message: 'User successfully deleted!' });
});

module.exports = router;
