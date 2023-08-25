const router = require('express').Router();

const usersRouter = require('./users');// импортируем роут пользователя
const cardsRouter = require('./cards');// импортируем роут с карточками

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемая страница не найдена' }));

module.exports = router;
