const cardRoutes = require('express').Router(); // настраиваем роут

const {
  getCards,
  createCards,
  deleteCardById,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCards);
cardRoutes.delete('/:cardId', deleteCardById);
cardRoutes.put('/:cardId/likes', putLikes);
cardRoutes.delete('/:cardId/likes', deleteLikes);

module.exports = cardRoutes;
