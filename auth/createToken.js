require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '24h',
  };
  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
};

module.exports = createToken;
