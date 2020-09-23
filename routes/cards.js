const router = require('express').Router();
const { createCard, getCards, deleteCardById } = require('../controllers/cards');

router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.get('/cards', getCards);

module.exports = router;
