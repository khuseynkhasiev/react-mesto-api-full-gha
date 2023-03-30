// eslint-disable-next-line import/no-extraneous-dependencies
const jsonWebToken = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const { Error } = require('mongoose');
const User = require('../models/user');
const {
  ERROR_INACCURATE_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  ERROR_CONFLICT,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    const err = new Error('На сервере произошла ошибка');
    err.statusCode = ERROR_INTERNAL_SERVER;
    next(err);
  }
};
// eslint-disable-next-line consistent-return
const getUserMe = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('Пользователь по указанному _id не найден');
      err.statusCode = ERROR_NOT_FOUND;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line consistent-return
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new Error('Переданы некорректные данные');
      err.statusCode = ERROR_INACCURATE_DATA;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    const err = new Error('На сервере произошла ошибка');
    err.statusCode = ERROR_INTERNAL_SERVER;
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const getUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('Пользователь по указанному _id не найден');
      err.statusCode = ERROR_NOT_FOUND;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line consistent-return
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new Error('Переданы некорректные данные');
      err.statusCode = ERROR_INACCURATE_DATA;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    const err = new Error('На сервере произошла ошибка');
    err.statusCode = ERROR_INTERNAL_SERVER;
    next(err);
  }
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then(() => {
      res.status(201).send(
        {
          email, name, about, avatar,
        },
      );
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new Error('Пользователь с такими данными уже существует');
        err.statusCode = ERROR_CONFLICT;
        next(err);
        // eslint-disable-next-line consistent-return
        return;
      }
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные при создании пользователя');
        err.statusCode = ERROR_INACCURATE_DATA;
        next(err);
        // eslint-disable-next-line consistent-return
        return;
      }
      next(e);
    });
};
// eslint-disable-next-line consistent-return
const patchUser = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;
  try {
    const { name, about } = req.body;
    const user = await User.findOneAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new Error('Пользователь по указанному _id не найден');
      err.statusCode = ERROR_NOT_FOUND;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line consistent-return
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new Error('Переданы некорректные данные при обновлении профиля');
      err.statusCode = ERROR_INACCURATE_DATA;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};
// eslint-disable-next-line consistent-return
const patchUserAvatar = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;
  try {
    const { avatar } = req.body;
    const user = await User.findOneAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new Error('Пользователь по указанному _id не найден');
      err.statusCode = ERROR_NOT_FOUND;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line consistent-return
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new Error('Переданы некорректные данные при обновлении профиля');
      err.statusCode = ERROR_INACCURATE_DATA;
      next(err);
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res
        .status(200)
        .cookie('jsonWebToken', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ email: user.email });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserId,
  getUserMe,
  createUser,
  patchUser,
  patchUserAvatar,
  login,
};
