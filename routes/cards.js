const cardRoutes = require('express').Router(); // настраиваем роут

const {
  getCards,
  createCard,
  deleteCardById,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCardById);
cardRoutes.put('/:cardId/likes', putLikes);
cardRoutes.delete('/:cardId/likes', deleteLikes);

module.exports = cardRoutes;
