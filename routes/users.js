const userRoutes = require('express').Router();

const {
  postUser, getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users'); // импортируем методы

userRoutes.get('/', getUsers); // записываем их роуты
userRoutes.post('/', postUser);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = userRoutes;
