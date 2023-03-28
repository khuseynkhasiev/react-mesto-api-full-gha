const jsonWebToken = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jsonWebToken;
  if (!token) {
    const err = new Error('Необходима авторизация');
    err.statusCode = ERROR_UNAUTHORIZED;
    next(err);
    // eslint-disable-next-line consistent-return
    return;
  }
  let payload;
  try {
    payload = jsonWebToken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = ERROR_UNAUTHORIZED;
    next(err);
    // eslint-disable-next-line consistent-return
    return;
  }
  req.user = payload;
  next();
};
