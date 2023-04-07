const Card = require('../models/card');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (e) {
    next(e);
  }
};

const createCard = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: userId });
    res.status(201).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new UnaccurateDateError('Переданы некорректные данные при создании карточки');
      next(err);
      return;
    }
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;

  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      const err = new NotFoundError('Карточка с указанным _id не найдена');
      next(err);
      return;
    } if (!userId === card.owner) {
      const err = new ForbiddenError('Вы не можете удалить карточку другого пользователя');
      next(err);
      return;
    }
    await Card.deleteOne(card);
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (e) {
    if (e.name === 'CastError') {
      const error = new UnaccurateDateError('Переданы некорректные данные');
      next(error);
      return;
    }
    next(e);
  }
};

const putCardLike = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      const err = new NotFoundError('Передан несуществующий _id карточки');
      next(err);
      return;
    }
    res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные для постановки/снятии лайка');
      next(err);
      return;
    }
    next(e);
  }
};
const deleteCardLike = async (req, res, next) => {
  /* const userId = req.cookies.id; */
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      const err = new NotFoundError('Передан несуществующий _id карточки');
      next(err);
      return;
    }
    res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные для постановки/снятии лайка');
      next(err);
      return;
    }
    next(e);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
