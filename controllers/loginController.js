const express = require('express');
const createToken = require('../auth/createToken');
const loginValidations = require('../middlewares/loginValidations');

const router = express.Router();

router.post(
  '/',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginValidations.validateUser,
  async (req, res) => {
    const { email, password } = req.body;

    const token = createToken({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
