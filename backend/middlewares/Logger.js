const winston = require('winston');
const exressWinston = require('express-winston');

// создадим логгер запросов
const requestWinston = exressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});
// логгер ошибок
const errorLogger = exressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestWinston,
  errorLogger,
};
