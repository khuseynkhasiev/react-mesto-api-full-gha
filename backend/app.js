const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  errors, celebrate, Joi,
} = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_NOT_FOUND } = require('./errors');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { errorLogger, requestWinston } = require('./middlewares/Logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://mestogram.nomoredomains.monster', 'http://mestogram.nomoredomains.monster'], credentials: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(requestWinston); // подключаем логгер запросов
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }).unknown(true),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.use(auth);
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', (req, res, next) => {
  const err = new Error(`${ERROR_NOT_FOUND} Not Found`);
  err.statusCode = ERROR_NOT_FOUND;
  next(err);
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Порт - ${PORT}, сервер запущен`);
});
