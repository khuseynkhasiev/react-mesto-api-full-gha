const { ERROR_INTERNAL_SERVER } = require('../errors');

module.exports.errorHandler = ((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === ERROR_INTERNAL_SERVER
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
