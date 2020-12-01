require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token found!' });
    }

    const hasToken = jwt.verify(token, JWT_SECRET);
    const { email } = hasToken;

    req.user = { ...req.user, email };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token!' });
  }
};

module.exports = tokenValidation;
