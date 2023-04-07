require('dotenv').config();

const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const ConflictError = require('../errors/conflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};
const getUserMe = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные');
      next(err);
      return;
    }
    next(e);
  }
};

const getUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные');
      next(err);
      return;
    }
    next(e);
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
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new ConflictError('Пользователь с такими данными уже существует');
        next(err);
        return;
      }
      if (e.name === 'ValidationError') {
        const err = new UnaccurateDateError('Переданы некорректные данные при создании пользователя');
        next(err);
        return;
      }
      next(e);
    });
};
const patchUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные при обновлении профиля');
      next(err);
      return;
    }
    next(e);
  }
};
const patchUserAvatar = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные при обновлении профиля');
      next(err);
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
      const {
        _id,
        name,
        about,
        avatar,
      } = user;
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: false,
        })
        .send({
          _id,
          email,
          name,
          about,
          avatar,
        });
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
