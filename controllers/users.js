const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('UserNotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'UserNotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный Id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
module.exports = { createUser, getUsers, getUserById };
