const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    // вернём записанные в базу данные
    .then((card) => res.status(201).send({ data: card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('CardNotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'CardNotFound') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный Id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
module.exports = { createCard, getCards, deleteCardById };
