require('dotenv').config();
const express = require('express');

const { PORT = 3002 } = process.env;
const app = express();
app.all('/*', (req, res, next) => {
  const err = new Error('Запрашиваемый ресурс не найден');
  err.statusCode = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log();
});
