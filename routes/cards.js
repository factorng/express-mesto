const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const getCards = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(JSON.parse(data));
  });
};

router.get('/cards', getCards);

module.exports = router;
