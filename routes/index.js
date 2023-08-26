const router = require('express').Router();

const usersRouter = require('./users');// импортируем роут пользователя из user.js
const cardsRouter = require('./cards');// импортируем роут с карточками из card.js

router.use('/users', usersRouter); // все методы сразу ему даем
router.use('/cards', cardsRouter);
router.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемая страница не найдена' }));

module.exports = router;
