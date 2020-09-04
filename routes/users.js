const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const getUserById = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (req.params.id) {
      const user = JSON.parse(data).find((item) => item._id === req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send({ message: 'Нет пользователя с таким id' });
      }
    }
  });
};

const getUsers = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(JSON.parse(data));
  });
};

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

module.exports = router;
