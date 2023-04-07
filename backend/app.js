require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {
  errors, celebrate, Joi,
} = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/notFoundError');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { errorLogger, requestWinston } = require('./middlewares/Logger');
const { options } = require('./middlewares/handleOptions');

const { PORT = 3000 } = process.env;
const app = express();
app.use('*', cors(options));
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(requestWinston); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', (req, res, next) => {
  const err = new NotFoundError('Not Found');
  next(err);
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Порт - ${PORT}, сервер запущен`);
});
