const mongoose = require('mongoose');
const cardSchema = require('../models/card');

// возвращаем все карточки
const getCards = (req, res) => {
  cardSchema
    .find({})
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      console.log(err.name);
      return res.status(500).send({ message: `Внутренняя ошибка сервера: ${err.name}` });
    });
};

// создаем карточку
const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return cardSchema
    .create({ name, link, owner })
    .then((response) => res.status(201).send(response))
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: `Некорректные данные: ${err.name}` });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера: ${err.name}` });
    });
};

// удаляем карточку по id
const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  return cardSchema.findByIdAndRemove(cardId)
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: `Некорректный id: ${cardId}` });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: `Карточка с указанным id не найдена: ${cardId}` });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера: ${err.name}` });
    });
};

// поставить лайк
const putLikes = (req, res) => {
  const { cardId } = req.params;
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      console.log(mongoose.Error);
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(400).send({ message: `Несуществующий id: ${cardId}` });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(404).send({ message: `Карточка с таким id не существует: ${cardId}` });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера: ${err.name}` });
    });
};
// убрать лайк
const deleteLikes = (req, res) => {
  const { cardId } = req.params;
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      console.log(mongoose.Error);
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: `Несуществующий id: ${cardId}` });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: `Карточка с таким id не существует: ${cardId}` });
      }
      return res.status(500).send({ message: `Внутренняя ошибка сервера: ${err.name}` });
    });
};

module.exports = {
  getCards,
  createCards,
  putLikes,
  deleteLikes,
  deleteCardById,
};
