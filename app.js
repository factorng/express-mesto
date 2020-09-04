const express = require('express');

const app = express();
const path = require('path');

const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
