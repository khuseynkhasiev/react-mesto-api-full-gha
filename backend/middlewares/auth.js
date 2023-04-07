const jsonWebToken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unathorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
    return;
  }

  let payload;
  try {
    payload = jsonWebToken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
    return;
  }
  req.user = payload;
  next();
};
